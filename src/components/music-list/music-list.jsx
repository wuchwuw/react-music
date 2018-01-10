import React, { Component } from 'react'
import './music-list.less'

export default class MuiscList extends Component {
  constructor () {
    super()
    this.back = this.back.bind(this)
  }
  back () {}
  render () {
    return (
      <div className="music-list">
        <div className="back" onClick={this.back}>
          <i className="icon-back"></i>
        </div>
        <h1 className="title"></h1>
        <div className="bg-image">
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
            <div className="song-list-wrapper"></div>
          </div>
      </div>
    )
  }
}