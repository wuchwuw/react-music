import React, { Component } from 'react'
import ProgressCircle from './progress-circle.jsx'
import { connect } from 'react-redux'
import './mini-player.styl'
import { setPlayingState, setFullScreen } from 'store/actions'

class MiniPlayer extends Component {
  constructor () {
    super()
    this.togglePlaying = this.togglePlaying.bind(this)
    this.setFullScreen = this.setFullScreen.bind(this)
  }
  togglePlaying (e) {
    e.stopPropagation()
    this.props.setPlayingState(!this.props.playing)
  }
  setFullScreen () {
    this.props.setFullScreen(true)
  }
  render () {
    const { currentSong, radius, percent, playing } = this.props
    const miniIcon = playing ? 'icon-mini-pause' : 'icon-mini-play'
    const cdCls = playing ? 'play' : 'pause'
    return (
      <div className="mini-player" onClick={this.setFullScreen}>
        <div className="icon">
          <div className="imgWrapper" ref="miniWrapper">
            <img src={currentSong.image} className={cdCls} width="40" height="40"/>
          </div>
        </div>
        <div className="text">
          <h2 className="name">{currentSong.name}</h2>
          <p className="desc">{currentSong.singer}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={radius} percent={percent}>
            <i onClick={ e => this.togglePlaying(e)} className={`iconfont mini ${miniIcon}`}></i>
          </ProgressCircle>
        </div>
        {/* <div className="control">
          <i className="icon-playlist"></i>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { playing } = state
  return {
    playing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayingState: (state) => {
      dispatch(setPlayingState(state))
    },
    setFullScreen: (state) => {
      dispatch(setFullScreen(state))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlayer)