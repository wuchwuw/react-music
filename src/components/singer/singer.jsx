import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import createSinger from 'common/js/singer'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './singer.less'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

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
    getSingerList()
      .then((res) => {
        if (ERR_OK === res.code) {
          this.setState({
            singer: this._normalizeSinger(res.data.list)
          })
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
    const { match, history, routes, location } = this.props
    const route = findRoute(routes, 'singerDetail')
    console.log(routes)
    console.log(route)
    console.log(location)
    return (
      <div className="singer">
        <ListView history={history} data={this.state.singer}></ListView>
        <ReactCSSTransitionGroup component="div" transitionName="slide" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          <Route location={location} key={location.key} path={route.path} component={route.component}></Route>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

function findRoute (routes, name) {
  return routes.find((item) => {
    return item.name === name
  })
}