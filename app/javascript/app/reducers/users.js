import * as ActionTypes from '../actions'

const initialUserState = { didInvalidate: true, isFetching: false, data: [] }
const users = (state = initialUserState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return { ...state.users, isFetching: true }
    case ActionTypes.RECEIVE_USERS:
      return ({ didInvalidate: false, isFetching: false, data: action.users })
    case ActionTypes.INVALIDATE_USERS_LIST:
      return ({ ...state.users, didInvalidate: true })
    case ActionTypes.USER_LOGOUT:
      return initialUserState
    default:
      return state
  }
}

export default users
