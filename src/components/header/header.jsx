import React, { Component } from 'react'
import './header.styl'
import { withRouter } from 'react-router'
import PlayerIcon from './player-icon'

class Mheader extends Component {
  constructor () {
    super()
    this.toggleFocus = this.toggleFocus.bind(this)
  }

  toggleFocus (e) {
    this.props.history.push('/search')
  }

  render () {
    return (
      <div className="m-header">
        <div className="search-box">
          <i className="icon-search"></i>
          <input
            className='box f'
            placeholder='搜索歌曲、歌手'
            onClick={e => this.toggleFocus(e)}
          />
        </div>
        {/* <div className="icon-wrap">
          <PlayerIcon></PlayerIcon>
        </div> */}
      </div>
    )
  }
}

export default withRouter(Mheader)