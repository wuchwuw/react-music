import React, { Component } from 'react'
import './mHeader.styl'
import { Link } from 'react-router-dom'
import TransitionGroup from 'react-transition-group/TransitionGroup'

class Mheader extends Component {
  constructor () {
    super()
    this.state = {
      placeholder: '搜索歌曲、歌手',
      query: '',
      isFocus: false
    }
    this.toggleFocus = this.toggleFocus.bind(this)
  }

  componentDidMount () {
    this.searchList.style.height = document.documentElement.clientHeight - 40 + 'px'
  }

  clear () {}

  toggleFocus (e) {
    if (this.state.isFocus) return
    this.setState((pre) => {
      this.query.focus()
      return {
        isFocus: !pre.isFocus
      }
    })
  }

  blur () {
    this.setState({
      isFocus: false
    })
  }

  render () {
    const { query, placeholder, isFocus } = this.state
    return (
      <div className="m-header">
        <Link to="/user" className="mine">
          <i className="icon-mine"></i>
        </Link>
        <div className="search-box" onClick={e => this.toggleFocus(e)}>
          <i className="icon-search"></i>
          <input
            ref={query => this.query = query}
            value={query}
            className={isFocus ? 'box f' : 'box'}
            placeholder={placeholder}
            onBlur={this.blur.bind(this)}
          />
          {/* <i onClick={this.clear} className="icon-dismiss"></i> */}
        </div>
        {
          !isFocus ?
            <Link to="/user" className="mine">
              <i className="icon-mine"></i>
            </Link>
            :
            <div className="cancel">取消</div>
        }
        <div style={isFocus ? { display: 'block'} : { display : 'none' }} ref={searchList => this.searchList = searchList} className="searchList"></div>
      </div>
    )
  }
}

export default Mheader