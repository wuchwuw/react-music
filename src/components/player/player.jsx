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
import Lyric from 'lyric-parser'

const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g

class Player extends Component {
  constructor () {
    super()
    this.state = {
      currentTime: 0,
      radius: 32
    }
    this.playingLyric = ''
    this.isPureMusic = false
    this.pureMusicLyric = ''
    this.currentLyric = null
    this.currentLineNum = 0
    this.back = this.back.bind(this)
    this.ready = this.ready.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.togglePlaying = this.togglePlaying.bind(this)
    this.end = this.end.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.resetPercent = this.resetPercent.bind(this)
    this.getLyric = this.getLyric.bind(this)
    this.lyricScrollEl = this.lyricScrollEl.bind(this)
    this.lyricEl = this.lyricEl.bind(this)
    this.handleLyric = this.handleLyric.bind(this)
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
      this.canLyricPlay = false
      if (this.currentLyric) {
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      this.audio.src = nextProps.currentSong.url
      this.audio.play()
      this.getLyric(nextProps.currentSong)
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
    this.canLyricPlay = true
    if (this.currentLyric && !this.isPureMusic) {
      this.currentLyric.seek(this.currentTime * 1000)
    }
  }
  next () {
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
    if (this.currentLyric) {
      this.currentLyric.seek(0)
    }
  }
  togglePlaying () {
    if (!this.songReady) {
      return
    }
    const { setPlayingState, playing } = this.props
    setPlayingState(!playing)
    if (this.currentLyric) {
      this.currentLyric.togglePlay()
    }
  }
  paused () {
    const { setPlayingState } = this.props
    setPlayingState(false)
    if (this.currentLyric) {
      this.currentLyric.stop()
    }

  }
  end () {
    this.next()
  }
  updateTime (e) {
    this.setState({
      currentTime: e.target.currentTime
    })
    if (this.currentLyric) {
      this.currentLyric.seek(this.state.currentTime * 1000)
    }
  }
  resetPercent (percent) {
    const { currentSong, playing } = this.props
    let currentTime = percent * currentSong.duration
    this.setState({
      currentTime: currentTime
    })
    this.audio.currentTime = currentTime
    if (this.currentLyric) {
      this.currentLyric.seek(currentTime * 1000)
    }
    if (!playing) {
      this.togglePlaying()
    }
  }
  getLyric (currentSong) {
    currentSong.getLyric().then(lyric => {
      if (currentSong.lyric !== lyric) {
        return
      }
      this.currentLyric = new Lyric(lyric, this.handleLyric)
      this.isPureMusic = !this.currentLyric.lines.length
      if (this.isPureMusic) {
        this.pureMusicLyric = this.currentLyric.lrc.replace(timeExp, '').trim()
        this.playingLyric = this.pureMusicLyric
      } else {
        if (this.playing && this.canLyricPlay) {
          // 这个时候有可能用户已经播放了歌曲，要切到对应位置
          this.currentLyric.seek(this.currentTime * 1000)
        }
      }
    }).catch((e) => {
      conosl.log(e)
      this.currentLyric = null
      this.playingLyric = ''
      this.currentLineNum = 0
    })
  }
  handleLyric({lineNum, txt}) {
    if (!this.lyricLine) {
      return
    }
    this.currentLineNum = lineNum
    if (lineNum > 5) {
      let lineEl = this.lyricLine.children[lineNum - 5]
      this.lyricList.scrollToElement(lineEl, 1000)
    } else {
      this.lyricList.scrollTo(0, 0, 1000)
    }
    this.playingLyric = txt
  }
  lyricEl (el) {
    this.lyricLine = el
  }
  lyricScrollEl (el) {
    this.lyricList = el
  }
  render () {
    const { fullScreen, location, playing, currentSong, playlist } = this.props
    const percent = this.state.currentTime / currentSong.duration
    const { radius } = this.state
    return (
      <div className="player" style={playlist.length > 0 ? {display:'block'} : {display:'none'}}>
        <TransitionGroup
          component="div"
          transitionName="normal"
          transitionEnterTimeout={300}
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
              lyricEl={this.lyricEl}
              lyricScrollEl={this.lyricScrollEl}
              currentLyric={this.currentLyric}
              currentLineNum={this.currentLineNum}
              playingLyric={this.playingLyric}
            >
            </Cd>
            :
            null }
        </TransitionGroup>
        {/* <ReactCSSTransitionGroup component="span" transitionName="mini" transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          { fullScreen ? null : <MiniPlayer percent={percent} key="mini" currentSong={currentSong}></MiniPlayer> }
        </ReactCSSTransitionGroup> */}
        <MiniPlayer percent={percent} key="mini" currentSong={currentSong}></MiniPlayer>
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