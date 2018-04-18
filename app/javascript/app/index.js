import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import configureStore from './store/configureStore'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {

  const store = configureStore()

  ReactDOM.render(
    <Provider store={store}>
      <Router basename={"/"}>
        <App />
      </Router>
    </Provider>
    ,
    document.body.appendChild(document.createElement('div')),
  )
})
