import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import apiV1 from '../lib/apiV1'
import { removeUser } from '../actions'

const DeleteUserButton = props => {
  const { userId, userEmail, dispatch } = props
  const deleteUser = () => {
    if (window.confirm(`Do you really want to delete user ${userEmail}?`)) {
      apiV1.deleteUser(userId).then(res => {
        if (res.ok) { dispatch(removeUser(userId)) }
      })
    }
  }

  return(
    <Button onClick={deleteUser}>
      Delete
    </Button>
  )
}

DeleteUserButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired
}

export default connect()(DeleteUserButton)
