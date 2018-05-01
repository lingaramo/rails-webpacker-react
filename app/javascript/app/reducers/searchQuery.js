import * as ActionTypes from '../actions'

const initialSearchQueryState = { search: "", prevSearch: "" }
const searchQuery = (state = initialSearchQueryState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_QUERY:
      return { search: action.searchString, prevSearch: state.search }
    case ActionTypes.CLEAR_SEARCH_QUERY:
      return initialSearchQueryState
    case ActionTypes.USER_LOGOUT:
      return initialSearchQueryState
    default:
      return state
  }
}

export default searchQuery
