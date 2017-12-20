import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from 'components/app.jsx'
import todoApp from 'store/reducers.js'
import Todo from 'components/todo/app'
import Root from 'components/reddit/Root'

let store = createStore(todoApp)

store.subscribe(() =>
  console.log(store.getState())
)

// Render the main component into the dom
render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
