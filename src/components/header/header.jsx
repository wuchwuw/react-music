import React, { Component } from 'react'
// import './header.styl'
import { withRouter } from 'react-router'
import SearchBox from 'components/search/search-box'

class Mheader extends Component {
  constructor () {
    super()
    this.toggleFocus = this.toggleFocus.bind(this)
  }

  toggleFocus (e) {
    this.props.history.push('/search')
  }

  render () {
    let { history } = this.props
    return (
      <SearchBox history={history}></SearchBox>
    )
  }
}

export default withRouter(Mheader)