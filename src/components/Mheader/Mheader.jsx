import React, { Component } from 'react'
import './mHeader.styl'
import { Link } from 'react-router-dom'
import SearchList from './search-list.jsx'
import { setQuery } from 'store/actions'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'

class Mheader extends Component {
  constructor () {
    super()
    this.state = {
      isFocus: false
    }
    this.toggleFocus = this.toggleFocus.bind(this)
    this.setQuery = this.setQuery.bind(this)
    this.onCompositionStart = this.onCompositionStart.bind(this)
    this.onCompositionEnd = this.onCompositionEnd.bind(this)
  }

  componentDidMount () {
    // this.searchList.style.height = document.documentElement.clientHeight - 40 + 'px'
  }

  clear () {}

  toggleFocus (e) {
    // if (this.state.isFocus) return
    // this.setState((pre) => {
    //   this.query.focus()
    //   return {
    //     isFocus: !pre.isFocus
    //   }
    // })
    this.props.history.push('/search')
  }

  blur () {
    this.props.dispatch(setQuery(''))
    this.props.history.go(-1)
  }

  setQuery (e) {
    // if (e.target.composing) return
    // console.log(3)
    // this.setState({
    //   query: e.target.value
    // })
    this.props.dispatch(setQuery(e.target.value))
  }

  onCompositionStart (e) {
    console.log(e)
    // e.target.composing = true
  }

  onCompositionEnd (e) {
    // console.log(2)
    // if (!e.target.composing) return
    // e.target.composing= false
    // this.trigger(e.target, 'input')
  }

  trigger (el, type) {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
  }

  render () {
    const { isFocus } = this.state
    const { query } = this.props
    return (
      <div className="m-header">
        {/* <Link to="/user" className="mine">
          <i className="icon-mine"></i>
        </Link> */}
        <div className="search-box" onClick={e => this.toggleFocus(e)}>
          <i className="icon-search"></i>
          <input
            ref={query => this.query = query}
            onInput={this.setQuery}
            value={query}
            className='box f'
            placeholder='搜索歌曲、歌手'
            onFocus={() => {this.setState({isFocus: true})}}
            onCompositionStart={(e) => {this.onCompositionStart(e)}}
            onCompositionEnd={(e) => {this.onCompositionEnd(e)}}
          />
          {/* <i onClick={this.clear} className="icon-dismiss"></i> */}
        </div>
        {
          !isFocus ?
            <Link to="/user" className="mine">
              <i className="icon-mine"></i>
            </Link>
            :
            <div onClick={this.blur.bind(this)} className="cancel">取消</div>
        }
        {/* <div style={isFocus ? { display: 'block'} : { display : 'none' }} ref={searchList => this.searchList = searchList} className="searchList">
          <SearchList history={history} query={this.state.query}></SearchList>
        </div> */}
      </div>
    )
  }
}

export default connect()(Mheader)