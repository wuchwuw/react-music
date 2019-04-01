import React, { Component } from 'react'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
import { connect } from 'react-redux'

class TopList extends Component {
  constructor () {
    super()
    this.rank = true
    this.state = {
      songs: []
    }
  }
  componentDidMount () {
    this._getMusicList()
  }
  _getMusicList() {
    if (!this.props.topList.id) {
      this.props.history.push('/rank')
      return
    }
    getMusicList(this.props.topList.id).then((res) => {
      if (res.code === ERR_OK) {
        processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
          this.setState({
            songs
          })
        })
      }
    })
  }
  _normalizeSongs(list) {
    let ret = []
    list.forEach((item) => {
      const musicData = item.data
      if (isValidMusic(musicData)) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
  render () {
    const { history, topList } = this.props
    const { songs } = this.state
    const title = ''
    const bgImage = topList.picUrl
    return <MusicList history={history} title={title} bgImage={bgImage} songs={songs}></MusicList>
  }
}

const mapStateToProps = (state) => {
  const { topList } = state
  return {
    topList: topList
  }
}

export default connect(mapStateToProps)(TopList)