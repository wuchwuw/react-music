import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './song-list.less'
import { selectPlay } from 'store/actions'

class SongList extends Component {
  constructor () {
    super()
    this.selectItem = this.selectItem.bind(this)
  }
  static propTypes = {
    songs: PropTypes.array.isRequired,
    rank: PropTypes.bool.isRequired
  }
  static defaultProps = {
    songs: [],
    rank: false
  }
  selectItem (songs, index) {
    this.props.dispatch(selectPlay(songs, index))
  }
  render () {
    const { rank, songs } = this.props
    return (
      <div className="song-list">
        <ul>
          {
            songs.map((song, i) => (
              <li className="item" key={song.id} onClick={e => {this.selectItem(songs, i)}}>
                <div className="rank" style={rank?{display:'block'}:{display:'none'}}>
                  <span></span>
                </div>
                <div className="content">
                  <h2 className="name">{song.name}</h2>
                  <p className="desc">{`${song.singer}·${song.album}`}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default connect()(SongList)