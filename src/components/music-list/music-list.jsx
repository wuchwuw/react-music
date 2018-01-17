import React, { Component } from 'react'
import './music-list.less'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import { connect } from 'react-redux'
// import { selectPlay } from 'store/action'

class MuiscList extends Component {
  constructor () {
    super()
    this.back = this.back.bind(this)
  }
  componentDidMount () {
    this.probeType = 3
    this.listenScroll = false
  }
  back () {
    this.props.history.goBack()
  }
  render () {
    const { title, bgImage } = this.props
    const bgStyle = { backgroundImage: `url(${bgImage}`}
    return (
      <div className="music-list">
        <div className="back" onClick={this.back}>
          <i className="icon-back"></i>
        </div>
        <h1 className="title">{title}</h1>
        <div className="bg-image" style={bgStyle}>
          <div className="play-wrap">
            <div className="play">
              <i className="icon-play"></i>
              <span className="text">随机播放全部</span>
            </div>
          </div>
          <div className="filter"></div>
        </div>
        <div className="bg-layer"></div>
          <div className="list">
          <Scroll data={this.props.songs} listenScroll={this.listenScroll} probeType={this.probeType}>
            <div className="song-list-wrapper">
              <SongList songs={this.props.songs}></SongList>
            </div>
            </Scroll>
          </div>

      </div>
    )
  }
}
export default connect()(MuiscList)