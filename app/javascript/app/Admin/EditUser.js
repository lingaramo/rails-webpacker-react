import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditUser extends Component {
  constructor(props) {
    super(props)
    let initialObject = { value: "", touched: false, valid: true, message: [] }

    this.state = {
      name: props.name,
      email: props.email,
      password:,
      password_confirmation:,
      role: props.role,
    }
  }

  render()
  {
    return(

    )
  }
}
