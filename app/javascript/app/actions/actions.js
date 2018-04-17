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
