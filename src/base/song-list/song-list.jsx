import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectPlay } from 'store/actions'
import styled from 'styled-components'

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
      <SongListWrap>
        <ul>
          {
            songs.map((song, i) => (
              <li className="song-list-item" key={song.id} onClick={e => {this.selectItem(songs, i)}}>
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
      </SongListWrap>
    )
  }
}

export default connect()(SongList)

const SongListWrap = styled.div`
  .song-list-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 14px;
  }
  .rank {
    flex: 0 0 25px
    width: 25px
    margin-right: 30px
    text-align: center
  }
  .icon {
    display: inline-block
    width: 25px
    height: 24px
    background-size: 25px 24px
  }
  .content {
    flex: 1;
    line-height: 20px;
    overflow: hidden;
  }
  .name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .desc {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 4px;
  }
`