import React, { Component, Suspense } from 'react'
import Mheader from 'components/header/header'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Tab from 'components/tab/tab'
import routes from './router/config.js'
import { Provider } from 'react-redux'
import configureStore from 'store'
import Player from 'components/player/player'

const store = configureStore()

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div id="app" style={{touchAction: 'none', paddingTop: '88px'}}>
            <div style={{position: 'fixed', top: '0', left: '0', right: '0', background: '#fff', zIndex:0}}>
              <Mheader/>
              <Tab />
            </div>
            <Player></Player>
            <Suspense fallback={<div></div>}>
              <Switch>
                {
                  routes.map((route, i) => (
                    <Route key={i} path={route.path} exact={route.exact} render={props => (
                      <route.component {...props} routes={route.routes}/>
                    )}/>
                  ))
                }
                <Redirect from="/" to="/recommend" />
              </Switch>
            </Suspense>
          </div>
        </Router>
      </Provider>
    )
  }
}