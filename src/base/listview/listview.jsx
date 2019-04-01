import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import './listview.styl'
import { is } from 'immutable'
import { setSinger } from 'store/actions'
import { connect } from 'react-redux'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

class ListView extends Component {
  constructor () {
    super()
    this.state = {
      currentIndex: 0,
      diff: -1
    }
    this.onShortcutTouchStart = this.onShortcutTouchStart.bind(this)
    this.onShortcutTouchMove = this.onShortcutTouchMove.bind(this)
    this.scroll = this.scroll.bind(this)
    this.scrollRef = React.createRef()
    this.listGroupRef = React.createRef()
    this.fixedRef = React.createRef()
  }
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  componentWillMount () {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
    this.scrollY = -1
  }
  componentWillReceiveProps(nextProps) {
    if (!is(nextProps.data, this.props.data)) {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    }
  }
  // componentWillUpdate (nextProps, nextState) {
  //   if (this.state.diff !== nextState.diff) {
  //     this.diff(nextState.diff)
  //   }
  // }
  selectItem (e, item) {
    e.preventDefault()
    this.props.history.push(`/singer/${item.id}`)
    this.props.dispatch(setSinger(item))
  }
  onShortcutTouchStart (e) {
    e.preventDefault()
    e.stopPropagation()
    this.scrollRef.scroll.stop()
    if (this.scrollRef.scroll.isInTransition) {
      this.scrollRef.scroll.disable()
    }
    let anchorIndex = getData(e.target, 'index')
    let firstTouch = e.touches[0]
    this.touch.y1 = firstTouch.pageY
    this.touch.anchorIndex = anchorIndex
    this._scrollTo(anchorIndex)
  }
  onShortcutTouchMove (e) {
    e.preventDefault()
    e.stopPropagation()
    this.touch.y2 = e.touches[0].pageY
    let detal = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
    let anchorIndex = detal + parseInt(this.touch.anchorIndex)
    this._scrollTo(anchorIndex)
  }
  _scrollTo (index) {
    if (!index && index !== 0) {
      return
    }
    if (index < 0) {
      index = 0
    }
    this.scrollRef.scroll.scrollToElement(this.listGroupRef.children[index])
    this.scrollY = this.scrollRef.scroll.y
    this.current(this.scrollY)
  }
  _calculateHeight () {
    this.listHeight = []
    const list = this.listGroupRef.children
    let height = 0
    this.listHeight.push(height)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      this.listHeight.push(height)
    }
  }
  current (newY) {
    const listHeight = this.listHeight
    if (newY > 0) {
      this.setState({
        currentIndex: 0
      })
      return
    }
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i]
      let height2 = listHeight[i + 1]
      if (-newY >= height1 && -newY < height2) {
        this.setState({
          currentIndex: i,
          diff: height2 + newY
        })
        return
      }
    }
    this.setState({
      currentIndex: listHeight.length - 2
    })
  }
  diff (newVal) {
    let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
    if (this.fixedTop === fixedTop) {
      return
    }
    this.fixedTop = fixedTop
    this.fixedRef.style.transform = `translate3d(0,${fixedTop}px,0)`
  }
  scroll (pos) {
    this.scrollY = pos.y
    this.current(this.scrollY)
  }
  render () {
    const { data } = this.props
    const { currentIndex } = this.state
    let self = this
    this.fixedTitle = function () {
      if (self.scrollY === 0 || self.scrollY === -1) {
        return ''
      }
      return data[currentIndex] ? data[currentIndex].title : ''
    }()
    this.shortcutList = data.map((group) => {
      return group.title.substr(0, 1)
    })
    return (
      <div className="listview">
        <Scroll listenScroll={this.listenScroll} probeType={3} data={data} scroll={this.scroll} ref={this.scrollRef}>
          <ul ref={this.listGroupRef}>
            {
              data.map((group) => (
                <li key={group.title} className="list-group">
                  <h2 className="list-group-title">{group.title}</h2>
                  <ul>
                    {
                      group.item.map((item) => (
                        <li onClick={e => {this.selectItem(e, item)}} key={item.id} className="list-group-item">
                          <img className="avatar" src={item.avatar} alt=""/>
                          <span className="name">{item.name}</span>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
          <div className="list-shortcut">
            <ul>
              {
                this.shortcutList.map((group, index) => (
                  <li
                    key={group}
                    data-index={index}
                    className={currentIndex===index ? 'current item' : 'item'}
                    onTouchStart={this.onShortcutTouchStart}
                    onTouchMove={this.onShortcutTouchMove}
                    onTouchEnd={e => {e.stopPropagation()}}
                  >
                    {group}
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="list-fixed" ref={this.fixedRef} style={this.fixedTitle ? {display:'block'} : {display: 'none'}}>
            <div className="fixed-title">{this.fixedTitle}</div>
          </div>
        </Scroll>
      </div>
    )
  }
}

export default connect()(ListView)