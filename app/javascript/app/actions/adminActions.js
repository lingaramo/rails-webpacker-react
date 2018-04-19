import apiV1 from '../lib/apiV1'

export const FETCH_USERS = 'FETCH_USERS'
export const fetchUsers = () => {
  return({ type: FETCH_USERS })
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const receiveUsers = users => {
  return({
    type: RECEIVE_USERS,
    users
  })
}

export const INVALIDATE_USERS_LIST = 'INVALIDATE_USERS_LIST'
export const invalidateUsersList = () => {
  return({ type: INVALIDATE_USERS_LIST })
}

export const fetchUsersAction = () => {
  return dispatch => {
    dispatch(fetchUsers())
    apiV1.getUsers().then( res => {
      dispatch(receiveUsers( res.data ))
    }).catch( errors => {
      debugger
    })
  }
}
