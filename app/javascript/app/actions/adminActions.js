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

const shouldFetchUsers = ( state ) => {
  const { users } = state
  if ( users.didInvalidate ) { return true }
  if ( users.isFetching ) {
    return false
  } else {
    return true
  }
}

export const fetchUsersAction = () => {
  return (dispatch, getState) => {
    const { users } = getState()
    if ( users.didInvalidate && !users.isFetching ) {
      dispatch(fetchUsers())
      apiV1.getUsers().then( res => {
        dispatch(receiveUsers( res ))
      })
    }
  }
}

export const fetchPaginatedUsersAction = ( url ) => {
  return (dispatch, getState) => {
    if (shouldFetchUsers(getState()) && url != undefined) {
      dispatch(fetchPaginatedUsers())
      const state = getState()
      apiV1.getUsers( url ).then( res => {
        dispatch(receivePaginatedUsers( res ))
      })
    }
  }
}
