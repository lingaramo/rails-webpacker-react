import { combineReducers } from 'redux'
import currentUser from './currentUser'
import users from './users'

const rootReducers = combineReducers({
  users,
  currentUser
})

export default rootReducers
