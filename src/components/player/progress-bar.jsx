import React, { Component } from 'react'
import './progress-bar.styl'

const progressBtnWidth = 16

export default class ProgressBar extends Component {
  constructor () {
    super()
    this.progressClick = this.progressClick.bind(this)
    this.processTouchStart = this.processTouchStart.bind(this)
    this.processTouchMove = this.processTouchMove.bind(this)
    this.processTouchEnd = this.processTouchEnd.bind(this)
    this.touch = {}
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.percent !== nextProps.percent) {
      if (!this.touch.initiated && nextProps.percent > 0) {
        let barWidth = this.progressBar.clientWidth - progressBtnWidth
        let offsetWidth = barWidth * nextProps.percent
        this._offsetWidth(offsetWidth)
      }
    }
  }
  _offsetWidth (offestWidth) {
    this.progress.style.width = `${offestWidth}px`
    this.progressBtn.style.transform = `translate3d(${offestWidth}px, 0, 0)`
  }
  progressClick (e) {
    let react = this.progressBar.getBoundingClientRect()
    let left = e.pageX - react.left
    this._offsetWidth(left)
    this.props.resetPercent(this._getCurrentPercent())
  }
  _getCurrentPercent () {
    let barWidth = this.progressBar.clientWidth - progressBtnWidth
    let processWidth = this.progress.clientWidth
    return processWidth / barWidth
  }
  processTouchStart (e) {
    this.touch.initiated = true
    this.touch.pageX = e.touches[0].pageX
    this.touch.left = this.progress.clientWidth
  }
  processTouchMove (e) {
    if (!this.touch.initiated) {
      return
    }
    let deltaX = e.touches[0].pageX - this.touch.pageX
    let offsetWidth = Math.min(this.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
    this._offsetWidth(offsetWidth)
  }
  processTouchEnd () {
    this.touch.initiated = false
    this.props.resetPercent(this._getCurrentPercent())
  }
  render () {
    return (
      <div className="progress-bar" onClick={this.progressClick} ref={progressBar => this.progressBar = progressBar}>
        <div className="bar-inner">
          <div className="progress" ref={progress => this.progress = progress}></div>
          <div className="progress-btn-wrapper"
            ref={progressBtn => this.progressBtn = progressBtn}
            onTouchStart={this.processTouchStart}
            onTouchMove={this.processTouchMove}
            onTouchEnd={this.processTouchEnd}
          >
            <div className="progress-btn"></div>
          </div>
        </div>
      </div>
    )
  }
}