import React from 'react'
import {render} from 'react-dom'
import App from './app'
import 'common/stylus/index.styl'
// import todoApp from 'store/reducers.js'
// import Todo from 'learn/todo/app'
// import Root from 'learn/reddit/Root'

// let store = createStore(todoApp)

// store.subscribe(() =>
//   console.log(store.getState())
// )

// Render the main component into the dom
render(
  <App />,
  document.getElementById('root')
)
