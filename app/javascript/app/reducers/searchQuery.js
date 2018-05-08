import * as ActionTypes from '../actions'

const initialSearchQueryState = { search: "" }
const searchQuery = (state = initialSearchQueryState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_QUERY:
      return { search: action.searchString }
    case ActionTypes.CLEAR_SEARCH_QUERY:
      return initialSearchQueryState
    case ActionTypes.USER_LOGOUT:
      return initialSearchQueryState
    default:
      return state
  }
}

export default searchQuery
