import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Profile from './Profile'

const UserComponent = ({ currentUser }) => {

  const CurrentUser = () => (
    <ul>
      { Object.keys(currentUser).map( (key, index) => (<li key={index}>{key}: {`${currentUser[key]}`}</li>) ) }
    </ul>
  )

  return(
    <Switch>
      <Route path="/user/profile" component={Profile} />
      <Route render={() => (<CurrentUser />)} />
    </Switch>
  )
}

UserComponent.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser
  })
}

export default connect(mapStateToProps)(UserComponent)
