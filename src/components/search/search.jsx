import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Route } from 'react-router-dom'
import { findRoute } from 'common/js/util'
import { connect } from 'react-redux'
import { setSinger } from 'store/actions'
import './search.styl'

class Search extends Component {
  constructor () {
    super()
    this.goDetail = this.goDetail.bind(this)
  }
  goDetail () {
    let singer = {
      id: '002J4UUk29y8BY',
      name: 'x'
    }
    this.props.dispatch(setSinger(singer))
    this.props.history.push('/search/002J4UUk29y8BY')
  }

  render () {
    const { match, history, routes, location } = this.props
    const route = findRoute(routes, 'searchSinger')
    return (
      <div className="search">
        <div onClick={this.goDetail}>xx</div>
        <ReactCSSTransitionGroup component="div" transitionName="slide" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          <Route history={history} location={location} key={location.key} path={route.path} component={route.component}></Route>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default connect()(Search)