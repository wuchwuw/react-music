import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Route } from 'react-router-dom'
import { findRoute } from 'common/js/util'
import { connect } from 'react-redux'
import SearchList from './search-list'
import SearchBox from './search-box'
import styled from 'styled-components'

class Search extends Component {
  constructor () {
    super()
    this.setQuery = this.setQuery.bind(this)
    this.state = {
      query: ''
    }
  }

  setQuery (e) {
    this.setState({
      query: e.target.value
    })
  }

  render () {
    const { history, routes, location } = this.props
    const { query } = this.state
    const { setQuery } = this
    const route = findRoute(routes, 'searchSinger')
    return (
      <SearchWrap>
        <SearchBox history={history} setQuery={setQuery}></SearchBox>
        <SearchList setQuery={setQuery} query={query} history={history}></SearchList>
        <TransitionGroup>
          <CSSTransition key={location.pathname} timeout={300} classNames="slider">
            <Route history={history} location={location} key={location.key} path={route.path} component={route.component}></Route>
         </CSSTransition>
        </TransitionGroup>
      </SearchWrap>
    )
  }
}

export default connect()(Search)

const SearchWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width 100%;
  background: #fff;
  z-index: 1;
`