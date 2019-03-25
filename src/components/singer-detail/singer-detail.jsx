import React, { Component } from 'react'
import MusicList from 'components/music-list/music-list'
import './singer-detail.styl'
import { connect } from 'react-redux'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

class SingerDetail extends Component {
  constructor () {
    super()
    this.state = {
      songs: []
    }
  }
  componentDidMount () {
    this._getDetail()
  }
  _getDetail () {
    if (!this.props.singer.id) {
      this.props.history.push('/singer')
      return
    }
    getSingerDetail(this.props.singer.id).then((res) => {
      if (res.code === ERR_OK) {
        processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
          this.setState({
            songs
          })
        })
      }
    })
  }
  _normalizeSongs (list) {
    let ret = []
    list.forEach((item) => {
      let {musicData} = item
      if (isValidMusic(musicData)) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
  render () {
    const { name: title, avatar: bgImage } = this.props.singer
    return (
      <div className="singer-slider">
        <MusicList songs={this.state.songs} history={this.props.history} title={title} bgImage={bgImage}></MusicList>
      </div>
      // <WidthSliderTransition {...this.props}>
      //   <MusicList songs={this.state.songs} history={this.props.history} title={title} bgImage={bgImage}></MusicList>
      // </WidthSliderTransition>
      // <MusicList songs={this.state.songs} history={this.props.history} title={title} bgImage={bgImage}></MusicList>
    )
  }
}

const mapStateToProps = (state) => {
  const {singer} = state
  return {
    singer: singer
  }
}

export default connect(
  mapStateToProps
)(SingerDetail)
