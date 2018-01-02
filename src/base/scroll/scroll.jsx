import React, { Component } from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'

export default class Scroll extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  static defaultProps = {
    probeType: 1,
    data: []
  }
  static propTypes = {
    data: PropTypes.array.isRequired,
    probeType: PropTypes.number.isRequired
  }
  componentDidMount () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  }
  componentWillUnmount() {
    console.log(this.props)
  }
  handleChange () {}
  _initScroll () {
    console.log(1)
    if (!this.wrapper) {
      return
    }
    this.scroll = new BScroll(this.wrapper, {
      probeType: this.props.probeType,
      eventPassthrough: 'horizontal'
    })
  }
  render () {
    return (
      <div ref={wrapper => this.wrapper = wrapper} style={{height: '100%',overflow: 'hidden'}}>
        {this.props.children}
      </div>
    )
  }
}