import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import AdminComponent from './AdminComponent'
import EditUser from './EditUser'

const AdminRoutes = props => {
  return(
    <Switch>
      <Route exact path="/admin" component={AdminComponent} />
      <Route path="/admin/:id/edit" component={EditUser} />
      <Redirect to="/not_found" />
    </Switch>
  )
}

export default AdminRoutes
