import apiV1 from '../lib/apiV1'

export const FETCH_USERS = 'FETCH_USERS'
export const fetchUsers = () => {
  return({ type: FETCH_USERS })
}

export const FETCH_PAGINATED_USERS = 'FETCH_PAGINATED_USERS'
export const fetchPaginatedUsers = () => {
  return({ type: FETCH_PAGINATED_USERS })
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const receiveUsers = users => {
  return({
    type: RECEIVE_USERS,
    users
  })
}

export const RECEIVE_PAGINATED_USERS = 'RECEIVE_PAGINATED_USERS'
export const receivePaginatedUsers = users => {
  return({
    type: RECEIVE_PAGINATED_USERS,
    users
  })
}

export const INVALIDATE_USERS_LIST = 'INVALIDATE_USERS_LIST'
export const invalidateUsersList = () => {
  return({ type: INVALIDATE_USERS_LIST })
}

const shouldFetchUsers = ( state, url ) => {
  const { users } = state
  if ( users.isFetching ) { return false }
  if ( users.didInvalidate ) { return true }
  if ( users.links.next == url ) {
    return true
  } else {
    return false
  }
}

export const fetchUsersAction = ( url ) => {
  return (dispatch, getState) => {
    // if (shouldFetchUsers(getState(), url)) {
      dispatch(fetchUsers())
      apiV1.getUsers( url ).then( res => {
        dispatch(receiveUsers( res ))
      }).catch( errors => {
      })
    // }
  }
}

export const fetchPaginatedUsersAction = ( url ) => {
  return (dispatch, getState) => {
    if (shouldFetchUsers(getState(), url) && url != undefined) {
      dispatch(fetchPaginatedUsers())
      const state = getState()
      apiV1.getUsers( url ).then( res => {
        dispatch(receivePaginatedUsers( res ))
      }).catch( errors => {
      })
    }
  }
}
