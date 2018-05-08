import apiV1 from '../lib/apiV1'

export const SEARCH_QUERY = 'SEARCH_QUERY'
export const searchQueryAction = searchString => {
  return {
    type: SEARCH_QUERY,
    searchString
  }
}

export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY'
export const clearSearchQueryAction = () => {
  return {
    type: CLEAR_SEARCH_QUERY
  }
}

export const searchAction = searchString => {
  return dispatch => {
    dispatch(searchQueryAction(searchString))
  }
}
