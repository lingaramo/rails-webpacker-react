import * as ActionTypes from '../actions'

const initialUserState = { didInvalidate: true, isFetching: false, data: [], links: { next: undefined } }
const users = (state = initialUserState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return { ...initialUserState, didInvalidate: false, isFetching: true }

    case ActionTypes.FETCH_PAGINATED_USERS:
      return { ...state, isFetching: true }

    case ActionTypes.REMOVE_USER:
      return { ...state, data: state.data.filter(user => user.id != action.userId)}

    case ActionTypes.RECEIVE_USERS:
      return ({
        didInvalidate: false,
        isFetching: false,
        data: action.users.data,
        links: action.users.links || { next: undefined }
      })

    case ActionTypes.RECEIVE_PAGINATED_USERS:
      return ({
        didInvalidate: false,
        isFetching: false,
        data: [...new Set([...state.data ,...action.users.data])],
        links: action.users.links
      })

    case ActionTypes.INVALIDATE_USERS_LIST:
      return ({ ...state, didInvalidate: true })

    case ActionTypes.USER_LOGOUT:
      return initialUserState

    default:
      return state
  }
}

export default users
