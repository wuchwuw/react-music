import React, { Component } from 'react'
import { connect } from 'react-redux'
import Scroll from 'base/scroll/scroll'
import animations from 'create-keyframe-animation'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './player.styl'
import Cd from './cd'
import MiniPlayer from './mini-player'
import { setFullScreen } from 'store/actions'
import { is } from 'immutable'

class Player extends Component {
  constructor () {
    super()
    this.back = this.back.bind(this)
    this.ready = this.ready.bind(this)
  }
  componentDidMount () {
    this.timer = null
    this.songReady = false
  }
  componentWillReceiveProps (nextProps) {
    if (!is(this.props.currentSong, nextProps.currentSong)) {
      if (!nextProps.currentSong.id || !nextProps.currentSong.url || nextProps.currentSong.id === this.props.currentSong.id) {
        return
      }
      this.songReady = false
      this.audio.src = nextProps.currentSong.url
      this.audio.play()
    }
  }
  back () {
    this.props.setFullScreen(false)
  }
  ready () {
    clearTimeout(this.timer)
    this.songReady = true
  }
  render () {
    const { playlist, currentIndex, fullScreen, location } = this.props
    const image = playlist[currentIndex] ? playlist[currentIndex].image : ''
    const name = playlist[currentIndex] ? playlist[currentIndex].name : ''
    const singer = playlist[currentIndex] ? playlist[currentIndex].singer : ''
    return (
      <div className="player" style={playlist.length > 0 ? {display:'block'} : {display:'none'}}>
        <TransitionGroup component="div" transitionName="normal" transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          { fullScreen ? <Cd key="cd" image={image} name={name} singer={singer} back={this.back}></Cd> : null }
        </TransitionGroup>
        <ReactCSSTransitionGroup component="span" transitionName="mini" transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          { fullScreen ? null : <MiniPlayer key="mini" image={image} name={name} singer={singer}></MiniPlayer> }
        </ReactCSSTransitionGroup>
        <audio ref={audio => this.audio = audio} onPlaying={this.ready}></audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { playlist, currentIndex, fullScreen, currentSong} = state
  return {
    playlist,
    currentIndex,
    fullScreen,
    currentSong
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFullScreen: (fullscreen) => {
      dispatch(setFullScreen(fullscreen))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)