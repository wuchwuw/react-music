import React, { Component } from 'react'
import './progress-bar.styl'

export default class ProgressBar extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div className="progress-bar" ref="progressBar">
        <div className="bar-inner">
          <div className="progress" ref="progress"></div>
          <div className="progress-btn-wrapper">
            <div className="progress-btn"></div>
          </div>
        </div>
      </div>
    )
  }
}