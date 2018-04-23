import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

class EditUser extends Component {
  render() {
    debugger
    return(
      <h1>Edit User</h1>
    )
  }
}

EditUser.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(EditUser)
