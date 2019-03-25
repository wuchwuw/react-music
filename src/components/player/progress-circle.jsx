import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './progress-circle.styl'

export default class ProgressBar extends Component {
  constructor () {
    super()
    this.state = {
      dashArray: Math.PI * 100
    }
  }
  static defaultProps = {
    radius: 32,
    precent: 0
  }
  static propTypes = {
    radius: PropTypes.number.isRequired,
    precent: PropTypes.number.isRequired,
  };
  render () {
    let { percent, radius } = this.props
    let { dashArray } = this.state
    let dashOffset = (1 - percent) * dashArray
    return (
      <div className="progress-circle">
        <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
          <circle
            className="progress-bar"
            r="50"
            cx="50"
            cy="50"
            fill="transparent"
            strokeDasharray={`${dashArray}`}
            strokeDashoffset={`${dashOffset}`}/>
        </svg>
        {
          this.props.children
        }
      </div>
    )
  }
}
