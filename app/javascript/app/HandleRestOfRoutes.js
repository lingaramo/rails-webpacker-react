import React from 'react'
import PropTypes from 'prop-types'

import { Route, Switch, withRouter } from 'react-router-dom'

import ResetPassword from './User/ResetPassword'

const HandleRestOfRoutes = props => {
  return(
    <Switch>
      <Route exact path="/reset_password" component={ ResetPassword } />
      <Route render ={ () => <h1>Not Found</h1> } />
    </Switch>
  )
}

HandleRestOfRoutes.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(HandleRestOfRoutes)
