import * as ActionTypes from '../actions'

const initialCurrentUserState = { authenticated: false }
const currentUser = (state = initialCurrentUserState, action) => {
  switch (action.type) {
    case ActionTypes.USER_NOT_AUTHENTICATED:
      return { authenticated: false }
    case ActionTypes.USER_AUTHENTICATED:
      return ({ ...action.user, authenticated: true })
    case ActionTypes.USER_LOGOUT:
      return initialCurrentUserState
    default:
      return state
  }
}

export default currentUser
