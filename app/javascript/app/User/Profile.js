import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import EditUser from '../shared/EditUser'

const Profile = props => {
  const { currentUser } = props
  return(
    <EditUser name={currentUser.name} email={currentUser.email}
      role={currentUser.role} userId={currentUser.id} action='update'
      redirectTo='/user'
    />
  )
}

Profile.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser
  })
}

export default connect(mapStateToProps)(Profile)
