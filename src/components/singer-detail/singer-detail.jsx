import React, { Component } from 'react'
import MusicList from 'components/music-list/music-list'
import './singer-detail.less'

export default class SingerDetail extends Component {
  constructor () {
    super()
    this.state = {
      songs: []
    }
  }
  render () {
    return (
      <div className="slide">
        <MusicList></MusicList>
      </div>
    )
  }
}