import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Route } from 'react-router-dom'
import { findRoute } from 'common/js/util'
import { connect } from 'react-redux'
import SearchList from './search-list'
import './search.styl'

class Search extends Component {
  constructor () {
    super()
    this.setQuery = this.setQuery.bind(this)
    this.clear = this.clear.bind(this)
    this.state = {
      query: ''
    }
  }
  componentDidMount () {
    this.query.focus()
  }

  setQuery (query) {
    this.setState({
      query
    })
  }

  clear () {
    this.props.history.go(-1)
  }

  render () {
    const { history, routes, location } = this.props
    const { query } = this.state
    const { setQuery } = this
    const route = findRoute(routes, 'searchSinger')
    return (
      <div className="search">
      <div className="m-header">
        <div className="search-box">
          <i className="icon-search"></i>
          <input
            ref={query => this.query = query}
            onChange={(e) => {setQuery(e.target.value)}}
            value={query}
            className='box f'
            placeholder='搜索歌曲、歌手'
            onFocus={() => {this.setState({isFocus: true})}}
          />
        </div>
        <div onClick={this.clear} className="cancel">取消</div>
      </div>
        <SearchList setQuery={setQuery} query={query} history={history}></SearchList>
        <ReactCSSTransitionGroup component="div" transitionName="slider" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          <Route history={history} location={location} key={location.key} path={route.path} component={route.component}></Route>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default connect()(Search)