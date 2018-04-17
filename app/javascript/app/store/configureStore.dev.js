import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from '../reducers';

const configureStore = () => {

  const initialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser") || JSON.stringify({authenticated:false})),
  }

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )

  const persistSession = () => {
    let currentUser = store.getState().currentUser;
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }

  const unsubscribe = store.subscribe(persistSession)

  return store
}

export default configureStore
