import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import AdminComponent from './AdminComponent'
import LoadUser from './LoadUser'

const AdminRoutes = props => {
  return(
    <Switch>
      <Route exact path="/admin/" component={AdminComponent} />
      <Route path="/admin/user/:id/edit" component={LoadUser} />
      <Redirect to="/not_found" />
    </Switch>
  )
}

AdminRoutes.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(AdminRoutes)
