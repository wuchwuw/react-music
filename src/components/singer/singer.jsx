import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import createSinger from 'common/js/singer'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { findRoute } from 'common/js/util'

import './singer.styl'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 20

let singerCahces = []

export default class Singer extends Component {
  constructor () {
    super()
    this.state = {
      singer: []
    }
  }
  componentDidMount () {
    this._getSinger()
  }
  _getSinger () {
    if (singerCahces.length) {
      this.setState({
        singer: singerCahces
      })
      return
    }
    getSingerList()
      .then((res) => {
        if (ERR_OK === res.code) {
          let singers = this._normalizeSinger(res.data.list)
          this.setState({
            singer: singers
          })
          singerCahces = singers.slice()
        }
      })
  }
  _normalizeSinger (list) {
    let map = {
      hot: {
        title: HOT_NAME,
        item: []
      }
    }
    list.forEach((item, index) => {
      if (index < HOT_SINGER_LEN) {
        map.hot.item.push(new createSinger({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      }
      const key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          item: []
        }
      }
      map[key].item.push(new createSinger({
        name: item.Fsinger_name,
        id: item.Fsinger_mid
      }))
    })
    let ret = []
    let hot = []
    for (let key in map) {
      let val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  }
  render () {
    const { history, routes, location } = this.props
    const route = findRoute(routes, 'singerDetail')
    return (
      <div className="singer">
        <ListView history={history} data={this.state.singer}></ListView>
        <TransitionGroup>
          <CSSTransition key={this.props.location.pathname} timeout={300} classNames="slider">
            <Route history={history} location={location} key={location.key} path={route.path} component={route.component}></Route>
         </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}