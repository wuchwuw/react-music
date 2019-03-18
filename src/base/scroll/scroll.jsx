import React, { Component } from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default class Scroll extends Component {
  constructor (props) {
    super(props)
  }
  static defaultProps = {
    probeType: 1,
    data: [],
    listenScroll: false,
    click: false,
    direction: DIRECTION_V
  }
  static propTypes = {
    data: PropTypes.array.isRequired,
    probeType: PropTypes.number.isRequired,
    listenScroll: PropTypes.bool.isRequired,
    click: PropTypes.bool.isRequired,
    direction: PropTypes.string.isRequired
  }
  componentDidMount () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  }
  componentWillUnmount() {
  }
  disable () {
    this.scroll && this.scroll.disable()
  }
  enable () {
    this.scroll && this.scroll.enable()
  }
  refresh () {
    this.scroll && this.scroll.refresh()
  }
  scrollTo () {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }
  scrollToElement () {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
  _initScroll () {
    if (!this.wrapper) {
      return
    }
    this.scroll = new BScroll(this.wrapper, {
      probeType: this.props.probeType,
      click: this.props.click,
      eventPassthrough: this.props.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
    })
    if (this.props.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.scroll(pos)
      })
    }
    if (this.props.pullup) {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.props.scrollToEnd()
        }
      })
    }
    if (this.props.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        this.props.beforeScroll()
      })
    }
  }
  render () {
    return (
      <div ref={wrapper => this.wrapper = wrapper} style={{height: '100%'}}>
        {this.props.children}
      </div>
    )
  }
}