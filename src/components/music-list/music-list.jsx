import React, { Component } from 'react'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import { connect } from 'react-redux'
import { prefixStyle } from 'common/js/dom'
import ListViewLoading from './loading'
import styled from 'styled-components'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
const backdrop = prefixStyle('backdrop-filter')


class MuiscList extends Component {
  constructor () {
    super()
    this.back = this.back.bind(this)
    this.probeType = 3
    this.listenScroll = true
    this.scroll = this.scroll.bind(this)
  }

  componentDidMount () {
    this.imageHeight = this.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT + 20
    this.list.style.top = `${this.imageHeight - 20}px`
  }

  back () {
    this.props.history.goBack()
  }

  getSnapshotBeforeUpdate () {
    return this.props.playlist.length > 0
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.list.style.bottom = '60px'
      this.scrollRef.refresh()
    }
  }

  scroll (pos) {
    let translateY = Math.max(this.minTransalteY, pos.y)
    let scale = 1
    let zIndex = 0
    let blur = 0
    const percent = Math.abs(pos.y / this.imageHeight)
    if (pos.y > 0) {
      scale = 1 + percent
      // zIndex = 10
    } else {
      blur = Math.min(20, percent * 20)
    }
    this.layer.style[transform] = `translate3d(0,${translateY}px,0)`
    this.filter.style[backdrop] = `blur(${blur}px)`
    if (pos.y < this.minTransalteY) {
      zIndex = 10
      this.bgImage.style.paddingTop = 0
      this.bgImage.style.height = `${RESERVED_HEIGHT}px`
      // this.playBtn.style.display = 'none'
    } else {
      this.bgImage.style.paddingTop = '70%'
      this.bgImage.style.height = 0
      // this.playBtn.style.display = ''
    }
    this.bgImage.style[transform] = `scale(${scale})`
    this.bgImage.style.zIndex = zIndex
  }
  render () {
    const { title, bgImage, rank } = this.props
    const bgStyle = { backgroundImage: `url(${bgImage}`}
    return (
      <MusicListWrap>
        <div className="back" onClick={this.back}>
          <i className="icon-back"></i>
        </div>
        <h1 className="title">{title}</h1>
        <div className={rank ? 'bg-image bg-rank' : 'bg-image'} style={bgStyle} ref={bgImage => this.bgImage = bgImage}>
          {/* <div className="play-wrap">
            <div className="play" ref={playBtn => this.playBtn = playBtn}>
              <i className="icon-play"></i>
              <span className="text">随机播放全部</span>
            </div>
          </div> */}
          <div className="filter" ref={filter => { this.filter = filter }}></div>
        </div>
        <div className="bg-layer" ref={layer => { this.layer = layer }}></div>
        <div className="list" ref={list => this.list = list}>
          {
            !this.props.songs.length ?
              <ListViewLoading></ListViewLoading>
            :
            <Scroll
              ref={(scroll) => {this.scrollRef = scroll}}
              data={this.props.songs}
              scroll={this.scroll}
              listenScroll={this.listenScroll}
              probeType={this.probeType}>
              <div className="song-list-wrapper">
                <SongList songs={this.props.songs}></SongList>
              </div>
            </Scroll>
          }
        </div>
      </MusicListWrap>
    )
  }
}

function mapStateToProps (state) {
  return {
    playlist: state.playlist
  }
}

export default connect(mapStateToProps, null)(MuiscList)

const MusicListWrap = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
  }
  .icon-back {
    display: block;
    padding: 10px;
    font-size: 22px;
    color: #fff;
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
  }
  .bg-image.bg-rank {
    background-position: center;
  }
  .play-wrap {
    position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;
  }
  .play {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #d93f30;
    color: $color-theme;
    border-radius: 100px;
    font-size: 0;
  }
  .icon-play {
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: 16px;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: #fff;
    border-radius: 10px 10px 0 0;
  }
  .list {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .song-list-wrapper {
    padding: 15px 20px;
    border-radius: 10px 10px 0 0;
    background: #fff;
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

`