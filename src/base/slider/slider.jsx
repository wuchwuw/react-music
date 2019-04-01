import React, { Component } from 'react'
import { addClass } from 'common/js/dom.js'
import BScroll from 'better-scroll'
import { getBanner } from 'api/recommend'
import { ERR_OK } from 'api/config'
import styled from 'styled-components'
// import './slider.styl'

let bannerCaches = []

export default class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dots: [],
      currentIndex: 0,
      banners: []
    }
  }
  static defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 4000
  }
  componentDidMount () {
    this.slider.style.height = (document.documentElement.clientWidth - 40) / 2.5 + 'px'
    this._getBanner()
  }
  _getBanner () {
    if (bannerCaches.length) {
      this.setBanners(bannerCaches)
      return
    }
    getBanner()
      .then((res) => {
        if (res.code === ERR_OK) {
          bannerCaches = res.data.slider.slice()
          this.setBanners(res.data.slider)
        }
      })
  }

  setBanners (banners) {
    this.setState({
      banners
    },() => {
      this._init()
    })
  }

  _init () {
    const { autoPlay } = this.props
    this._setSliderWidth()
    this._initDots()
    this._initSlider()
    if (autoPlay) {
      this._play()
    }
    window.addEventListener('resize', () => {
      if (!this.scroll || !this.scroll.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.scroll.isInTransition) {
          this._onScrollEnd()
        } else {
          if (autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    })
  }
  _setSliderWidth (isResize) {
    const { loop } = this.props
    let sliderWidth = this.slider.clientWidth
    this.children = this.sliderChildren.children
    let width = 0
    Array.prototype.forEach.call(this.children, (item) => {
      let child = item
      addClass(child, 'slider-item')
      child.style.width = sliderWidth + 'px'
      width += sliderWidth
    })
    if (loop && !isResize) {
      width += sliderWidth * 2
    }
    this.sliderChildren.style.width = width + 'px'
  }
  _initSlider () {
    const { loop, autoPlay } = this.props
    this.scroll = new BScroll(this.slider, {
      scrollX: true,
      scrolly: false,
      momentum: false,
      click: true,
      snap: {
        loop: loop,
        threshold: 0.3,
        speed: 400
      }
    })
    this.scroll.on('scrollEnd', this._onScrollEnd.bind(this))
    this.scroll.on('touchend', () => {
      if (autoPlay) {
        this._play()
      }
    })
    this.scroll.on('beforeScrollStart', () => {
      if (autoPlay) {
        clearTimeout(this.timer)
      }
    })
  }
  refresh() {
    if (this.scroll) {
      this._setSliderWidth(true)
      this.scroll.refresh()
    }
  }
  _onScrollEnd () {
    const { autoPlay } = this.props
    let pageIndex = this.scroll.getCurrentPage().pageX
    this.setState({
      currentIndex: pageIndex
    })
    if (autoPlay) {
      this._play()
    }
  }
  _play () {
    const { interval } = this.props
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.scroll.next()
    }, interval)
  }
  _initDots () {
    this.setState({
      dots: new Array(this.children.length).fill('1')
    })
  }
  render () {
    return (
      <SliderWrap ref={(slider) => { this.slider = slider}}>
        <div className="slider-group" ref={(sliderChildren) => { this.sliderChildren = sliderChildren}}>
        {
          this.state.banners.map((item, index) => {
            return (
              <div key={item.id}>
                <a href={item.linkUrl}>
                  <img src={item.picUrl} alt=""/>
                </a>
              </div>
            )
          })
        }
        </div>
        <div className="dots">
          {
            this.state.dots.map((dot, index) => {
              return (
                <span key={index} className={this.state.currentIndex === index ? 'dot active' : 'dot'}></span>
              )
            })
          }
        </div>
      </SliderWrap>
    )
  }
}

const SliderWrap = styled.div`
  min-height: 1px;
  overflow: hidden;
  border-radius: 5px;
  .slider-group {
    position: relative;
    white-space: nowrap;
  }
  .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }
  a {
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }
  img {
    display: block;
    width: 100%;
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
  }
  .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
  }
  .dot.active {
    width: 20px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
  }

`