import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

const Home = ({routes}) => {
  return (
      <div>
        <h1>Home</h1>
        <ul>
          <li><Link to="/home/netflix">Netflix</Link></li>
          <li><Link to="/home/zillow-group">Zillow Group</Link></li>
          <li><Link to="/yahoo">Yahoo</Link></li>
          <li><Link to="/modus-create">Modus Create</Link></li>
        </ul>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} exact={route.exact} render={props => (
            <route.component {...props} routes={route.routes}/>
          )}/>
        ))}
      </div>
  )
}

export default Home