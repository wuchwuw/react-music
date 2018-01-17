import React, { Component } from 'react'
import Scroll from 'base/scroll/scroll'
import animations from 'create-keyframe-animation'
import ProgressBar from './progress-bar'
import { prefixStyle } from 'common/js/dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './cd.styl'

const transform = prefixStyle('transform')

export default class Cd extends Component {
  constructor () {
    super()
  }
  componentWillAppear (callback) {
    console.log('3333333')
    callback()
  }
  componentWillEnter (cb) {
    const { x, y, scale } = this._getPosAndScale()
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0,0,0) scale(1)`
      }
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    })
    this.top.style.animation = 'in 0.4s linear'
    this.bottom.style.animation = 'fade-in 0.4s linear'
    animations.runAnimation(this.cdWrapper, 'move', cb)
  }
  componentDidEnter () {
    animations.unregisterAnimation('move')
    this.cdWrapper.style.animation = ''
    this.top.style.animation = ''
    this.bottom.style.animation = ''
  }
  componentWillLeave (cb) {
    this.top.style.animation = 'out 0.4s linear'
    this.bottom.style.animation = 'fade-out 0.4s linear'
    this.cdWrapper.style.transition = 'all 0.4s'
    const {x, y, scale} = this._getPosAndScale()
    this.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
    const timer = setTimeout(cb, 400)
    this.cdWrapper.addEventListener('transitionend', () => {
      clearTimeout(timer)
      cb()
    })
  }
  componentDidLeave () {
    this.top.style.animation = ''
    this.bottom.style.animation = ''
    this.cdWrapper.style.transition = ''
    this.cdWrapper.style[transform] = ''
  }
  _getPosAndScale() {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const scale = targetWidth / width
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    return {
      x,
      y,
      scale
    }
  }
  render () {
    const { name, singer, image, back } = this.props
    return (
      <div className="normal-player" ref={bottom => this.bottom = bottom}>
        <div className="background">
          <img width="100%" height="100%" src={image} alt=""/>
        </div>
        <div className="top" ref={top => this.top = top}>
          <div className="back" onClick={e => back()}>
            <i className="icon-back"></i>
          </div>
          <h1 className="title">{name}</h1>
          <h2 className="subtitle">{singer}</h2>
        </div>
        <div className="middle">
          <div className="middle-l" ref={cdWrapper => this.cdWrapper = cdWrapper}>
            <div className="cd-wrapper">
              <div className="cd">
                <img className="image" src={image} alt=""/>
              </div>
            </div>
            <div className="playing-lyric-wrapper">
              <div className="playing-lyric"></div>
            </div>
          </div>
          <Scroll className="middle-r">
            <div className="lyric-wrapper">
              <div>
                <p className="text"></p>
              </div>
            </div>
          </Scroll>
        </div>
        <div className="bottom">
          <div className="dot-wrapper">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="progress-wrapper">
            <span className="time time-l"></span>
            <div className="progress-bar-wrapper">
              <ProgressBar></ProgressBar>
            </div>
            <span className="time time-r"></span>
          </div>
          <div className="operators">
            <div className="icon i-left">
              <i className="iconMode"></i>
            </div>
            <div className="icon i-left">
              <i className="icon-prev"></i>
            </div>
            <div className="icon i-center">
              <i className="needsclick icon-play"></i>
            </div>
            <div className="icon i-right" >
              <i className="icon-next"></i>
            </div>
            <div className="icon i-right">
              <i className="icon"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}