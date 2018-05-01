import apiV1 from '../lib/apiV1'

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'
export const userAuthenticatedAction = user => {
  return {
    type: USER_AUTHENTICATED,
    user
  }
}

export const USER_NOT_AUTHENTICATED = 'USER_NOT_AUTHENTICATED'
export const userNotAuthenticatedAction = () => {
  return {
    type: USER_NOT_AUTHENTICATED
  }
}

export const USER_LOGOUT = 'USER_LOGOUT'
export const userLogoutAction = () => {
  return {
    type: USER_LOGOUT
  }
}

export const validateTokenAction = () => {
  return dispatch => {
    apiV1.validateToken().then( response => {
      dispatch(userAuthenticatedAction(response.data))
    }).catch( error => {
      if (error.status == 401) {
        dispatch(userLogoutAction())
      }
    })
  }
}
