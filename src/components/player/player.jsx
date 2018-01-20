import React, { Component } from 'react'
import { connect } from 'react-redux'
import Scroll from 'base/scroll/scroll'
import animations from 'create-keyframe-animation'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './player.styl'
import Cd from './cd'
import MiniPlayer from './mini-player'
import { setFullScreen, setCurrentIndex, setCurrentSong, setPlayingState } from 'store/actions'
import { is } from 'immutable'

class Player extends Component {
  constructor () {
    super()
    this.state = {
      currentTime: 0
    }
    this.back = this.back.bind(this)
    this.ready = this.ready.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.togglePlaying = this.togglePlaying.bind(this)
    this.end = this.end.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.resetPercent = this.resetPercent.bind(this)
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
    if (this.props.playing !== nextProps.playing) {
      if (!this.songReady) {
        return
      }
      setTimeout(() => {
        nextProps.playing ? this.audio.play() : this.audio.pause()
      }, 20)
    }
  }
  back () {
    this.props.setFullScreen(false)
  }
  ready () {
    clearTimeout(this.timer)
    this.songReady = true
  }
  next () {
    console.log(this.props)
    const { currentIndex, playlist, setCurrentIndex, setCurrentSong, playing } = this.props
    if (!this.songReady) {
      return
    }
    if (playlist.length === 1) {
      this.loop()
    } else {
      let index = currentIndex + 1
      if (index === playlist.length) {
        index = 0
      }
      setCurrentIndex(index)
      setCurrentSong(playlist[index])
      if (!playing) {
        this.togglePlaying()
      }
    }
  }
  prev () {
    const { currentIndex, playlist, setCurrentIndex, setCurrentSong, playing } = this.props
    if (!this.songReady) {
      return
    }
    if (playlist.length === 1) {
      this.loop()
    } else {
      let index = currentIndex - 1
      if (index < 0) {
        index = playlist.length - 1
      }
      setCurrentIndex(index)
      setCurrentSong(playlist[index])
      if (!playing) {
        this.togglePlaying()
      }
    }
  }
  loop () {
    const { setPlayingState } = this.props
    this.audio.play()
    setPlayingState(true)
  }
  togglePlaying () {
    if (!this.songReady) {
      return
    }
    const { setPlayingState, playing } = this.props
    setPlayingState(!playing)
  }
  paused () {
    const { setPlayingState } = this.props
    setPlayingState(false)
  }
  end () {
    this.next()
  }
  updateTime (e) {
    this.setState({
      currentTime: e.target.currentTime
    })
  }
  resetPercent (percent) {
    const { currentSong } = this.props
    let currentTime = percent * currentSong.duration
    this.setState({
      currentTime: currentTime
    })
    this.audio.currentTime = currentTime
  }
  render () {
    const { fullScreen, location, playing, currentSong, playlist } = this.props
    const percent = this.state.currentTime / currentSong.duration
    return (
      <div className="player" style={playlist.length > 0 ? {display:'block'} : {display:'none'}}>
        <TransitionGroup component="div" transitionName="normal" transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          { fullScreen
            ?
            <Cd
              key="cd"
              currentSong={currentSong}
              currentTime={this.state.currentTime}
              togglePlaying={this.togglePlaying}
              back={this.back}
              prev={this.prev}
              playing={playing}
              percent={percent}
              resetPercent={this.resetPercent}
              next={this.next}
            >
            </Cd>
            :
            null }
        </TransitionGroup>
        <ReactCSSTransitionGroup component="span" transitionName="mini" transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          { fullScreen ? null : <MiniPlayer key="mini" currentSong={currentSong}></MiniPlayer> }
        </ReactCSSTransitionGroup>
        <audio ref={audio => this.audio = audio} onPlaying={this.ready} onEnded={this.end} onTimeUpdate={e => this.updateTime(e)}></audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { playlist, currentIndex, fullScreen, currentSong, playing} = state
  return {
    playlist,
    currentIndex,
    fullScreen,
    currentSong,
    playing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFullScreen: (fullscreen) => {
      dispatch(setFullScreen(fullscreen))
    },
    setCurrentIndex: (index) => {
      dispatch(setCurrentIndex(index))
    },
    setCurrentSong: (song) => {
      dispatch(setCurrentSong(song))
    },
    setPlayingState: (state) => {
      dispatch(setPlayingState(state))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)