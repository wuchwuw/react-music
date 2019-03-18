import React, { Component } from 'react'
import loadingGif from './loading.gif'

export default class Loading extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="loading">
        <img width="24" height="24" src={loadingGif}/>
        <p className="desc">{this.props.title || ''}</p>
      </div>
    )
  }
}