import React, { Component } from 'react'
import loadingGif from './loading.gif'
import styled from 'styled-components'

export default class Loading extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <LoadingWrap>
        <img width="24" height="24" src={loadingGif}/>
        <p className="desc">{this.props.title || ''}</p>
      </LoadingWrap>
    )
  }
}

const LoadingWrap = styled.div`
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
` 