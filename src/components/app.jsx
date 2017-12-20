import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import routes from '../router/config.js'

class App extends React.Component {
  componentWillMount() {
    console.log('componentWillMount')
  }
  render () {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/hello">Hello</Link></li>
          </ul>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} path={route.path} exact={route.exact} render={props => (
                <route.component {...props} routes={route.routes}/>
              )}/>
            ))}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App