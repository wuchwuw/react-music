import React, { Component } from 'react'
import Mheader from 'components/Mheader/Mheader'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Tab from 'components/tab/tab'
import routes from './router/config.js'

export default class App extends Component {
  render () {
    return (
      <Router>
        <div id="app">
          <Mheader />
          <Tab />
          <Switch>
            {
              routes.map((route, i) => (
                <Route key={i} path={route.path} exact={route.exact} render={props => (
                  <route.component {...props} routes={route.children}/>
                )}/>
              ))
            }
          </Switch>
        </div>
      </Router>
    )
  }
}