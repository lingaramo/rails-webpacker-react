import React from 'react'

import { connect } from 'react-redux'

import EditUser from '../shared/EditUser'

const Profile = props => {
  const { currentUser } = props
  return(
    <EditUser name={currentUser.name} email={currentUser.email}
      role={currentUser.role} userId={currentUser.id} />
  )
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser
  })
}

export default connect(mapStateToProps)(Profile)
