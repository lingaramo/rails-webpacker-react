import { combineReducers } from 'redux'

import currentUser from './currentUser'
import users from './users'
import searchQuery from './searchQuery'

const rootReducers = combineReducers({
  users,
  currentUser,
  searchQuery
})

export default rootReducers
