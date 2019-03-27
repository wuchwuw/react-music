import React, { Component } from 'react'
import Scroll from 'base/scroll/scroll'
import animations from 'create-keyframe-animation'
import ProgressBar from './progress-bar'
import { prefixStyle } from 'common/js/dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import { CSSTransition } from 'react-transition-group'
import './cd.styl'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default class Cd extends Component {
  constructor () {
    super()
    this.middleTouchStart = this.middleTouchStart.bind(this)
    this.middleTouchMove = this.middleTouchMove.bind(this)
    this.middleTouchEnd = this.middleTouchEnd.bind(this)
    this.currentShow = 'cd'
    this.touch = {}
  }

  middleTouchStart (e) {
    this.touch.initiated = true
    this.touch.startX = e.touches[0].pageX
    this.touch.startY = e.touches[0].pageY
  }
  middleTouchMove (e) {
    if (!this.touch.initiated) {
      return
    }
    let deltaX = e.touches[0].pageX - this.touch.startX
    let deltaY = e.touches[0].pageY - this.touch.startY
    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return
    }
    this.touch.moved = true
    const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
    let offset = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    this.touch.percent = Math.abs(offset / window.innerWidth)
    this.lyricList.style[transform] = `translate3d(${offset}px, 0, 0)`
    this.lyricList.style[transitionDuration] = 0
    this.cdWrapper.style.opacity = 1 - this.touch.percent
    this.cdWrapper.style[transitionDuration] = 0
  }
  middleTouchEnd () {
    if (!this.touch.moved) {
      return
    }
    let offsetWidth
    let opacity
    if (this.currentShow === 'cd') {
      if (this.touch.percent > 0.1) {
        offsetWidth = -window.innerWidth
        opacity = 0
        this.currentShow = 'lyric'
      } else {
        offsetWidth = 0
        opacity = 1
      }
    } else {
      if (this.touch.percent < 0.9) {
        offsetWidth = 0
        opacity = 1
        this.currentShow = 'cd'
      } else {
        offsetWidth = -window.innerWidth
        opacity = 0
      }
    }
    let time = 300
    this.lyricList.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    this.lyricList.style[transitionDuration] = `${time}ms`
    this.cdWrapper.style.opacity = opacity
    this.cdWrapper.style[transitionDuration] = `${time}ms`
    this.touch.initiated = false
    this.touch.moved = false
  }
  _pad (num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }
  format (interval) {
    interval = interval | 0
    let minute = interval / 60 | 0
    let second = this._pad(interval % 60)
    return `${minute}:${second}`
  }
  render () {
    let {
      currentSong,
      back,
      playing,
      percent,
      resetPercent,
      currentLyric,
      lyricEl,
      lyricScrollEl,
      currentLineNum,
      playingLyric
    } = this.props
    let cTime = this.format(this.props.currentTime)
    let dTime = this.format(currentSong.duration)
    return (
      <div className="normal-player" ref={bottom => this.bottom = bottom}>
        <div className="background">
          <img width="100%" height="100%" src={currentSong.image} alt=""/>
        </div>
        <div className="top" ref={top => this.top = top}>
          <div className="back" onClick={e => back()}>
            <i className="icon-back"></i>
          </div>
          <h1 className="title">{currentSong.name}</h1>
          <h2 className="subtitle">{currentSong.singer}</h2>
        </div>
        <div
          className="middle"
          onTouchStart={this.middleTouchStart}
          onTouchMove={this.middleTouchMove}
          onTouchEnd={this.middleTouchEnd}
        >
          <div className="middle-l" ref={cdWrapper => this.cdWrapper = cdWrapper}>
            <div className="cd-wrapper">
              <div className="cd">
                <img className={playing?'image play' : 'image pause'} src={currentSong.image} alt=""/>
              </div>
            </div>
            <div className="playing-lyric-wrapper">
              <div className="playing-lyric">{playingLyric}</div>
            </div>
          </div>
          <div className="middle-r" ref={lyricList => this.lyricList = lyricList}>
            <Scroll ref={lyricScrollEl} data={currentLyric ? currentLyric.lines : []}>
              <div className="lyric-wrapper" ref={lyricEl}>
                {
                  currentLyric && currentLyric.lines.map((line, index) => (
                    <p className={currentLineNum === index ? 'text current' : 'text'} key={index}>{line.txt}</p>
                  ))
                }
              </div>
            </Scroll>
          </div>
        </div>
        <div className="bottom">
          <div className="dot-wrapper">
            <span className={this.currentShow === 'cd' ? 'dot active' : 'dot'}></span>
            <span className={this.currentShow === 'lyric' ? 'dot active' : 'dot'}></span>
          </div>
          <div className="progress-wrapper">
            <span className="time time-l">{cTime}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={percent} resetPercent={resetPercent}></ProgressBar>
            </div>
            <span className="time time-r">{dTime}</span>
          </div>
          <div className="operators">
            <div className="icon i-left">
              <i className="iconMode"></i>
            </div>
            <div className="icon i-left">
              <i onClick={this.props.prev} className="icon-prev"></i>
            </div>
            <div className="icon i-center">
              <i onClick={this.props.togglePlaying} className={playing ? 'icon-pause' : 'icon-play'}></i>
            </div>
            <div className="icon i-right" >
              <i onClick={this.props.next} className="icon-next"></i>
            </div>
            <div className="icon i-right">
              <i  className="icon"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
