import React, { Component } from 'react'
import './search-box.styl'


class SearchBox extends Component {
  constructor () {
    super()
    this.state = {
      placeholder: '搜索歌曲、歌手',
      query: '',
      isFocus: false
    }
    this.toggleFocus = this.toggleFocus.bind(this)
  }

  clear () {}

  toggleFocus (e) {
    if (this.state.isFocus) return
    this.setState((pre) => {
      return {
        isFocus: !pre.isFocus
      }
    })
    this.query.focus()
  }

  blur () {
    this.setState({
      isFocus: false
    })
  }

  render () {
    const { query, placeholder, isFocus } = this.state
    return (
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
    )
  }
}

export default SearchBox