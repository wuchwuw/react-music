import React, { Component } from 'react'
import Mheader from 'components/Mheader/Mheader'
import { Router, Route, Switch } from 'react-router-dom'
import Tab from 'components/tab/tab'
import routes from './router/config.js'
import { Provider } from 'react-redux'
import configureStore from 'store'
import createHistory from 'history/createBrowserHistory'

const store = configureStore()
const history = createHistory()

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div id="app">
            <Mheader />
            <Tab />
            <Switch>
              {
                routes.map((route, i) => (
                  <Route key={i} path={route.path} exact={route.exact} render={props => (
                    <route.component {...props} routes={route.routes}/>
                  )}/>
                ))
              }
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}