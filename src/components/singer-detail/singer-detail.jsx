import React, { Component } from 'react'
import MusicList from 'components/music-list/music-list'
import './singer-detail.less'
import {connect} from 'react-redux'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic } from 'common/js/song'

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
        this.songs = this._normalizeSongs(res.data.list)
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
    const { title, bgImage} = this.props.singer
    return (
      <div className="slide">
        <MusicList title={title} bgImage={bgImage}></MusicList>
      </div>
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
