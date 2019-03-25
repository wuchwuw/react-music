import React, { Component } from 'react'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
import { connect } from 'react-redux'

class Disc extends Component {
  constructor () {
    super()
    this.rank = true
    this.state = {
      songs: []
    }
  }
  componentDidMount () {
    this._getSongList()
  }
  _getSongList() {
    if (!this.props.disc.dissid) {
      this.props.history.push('/recommend')
      return
    }
    getSongList(this.props.disc.dissid).then((res) => {
      if (res.code === ERR_OK) {
        processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
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
      if (isValidMusic(item)) {
        ret.push(createSong(item))
      }
    })
    return ret
  }
  render () {
    const { history, disc } = this.props
    const { songs } = this.state
    const title = disc.dissname
    const bgImage = disc.imgurl
    return <MusicList history={history} title={title} bgImage={bgImage} songs={songs}></MusicList>
  }
}

const mapStateToProps = (state) => {
  const { disc } = state
  return {
    disc: disc
  }
}

export default connect(mapStateToProps)(Disc)