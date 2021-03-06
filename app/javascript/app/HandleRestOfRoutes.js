import React from 'react'

import { Route, Switch } from 'react-router-dom'

import ResetPassword from './User/ResetPassword'

const HandleRestOfRoutes = () => {
  return(
    <Switch>
      <Route exact path="/reset_password" component={ ResetPassword } />
      <Route exact path="/not_authorized" render ={ () => <h1>Not Authorized</h1> } />
      <Route render ={ () => <h1>Not Found</h1> } />
    </Switch>
  )
}

export default HandleRestOfRoutes
