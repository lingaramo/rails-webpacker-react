import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import apiV1 from '../lib/apiV1'

class LoadUser extends Component {
  state = { user: { isFetching: true } }
  componentDidMount() {
    const { id } = this.props.match.params
    const { history } = this.props

    apiV1.getUser( id ).then( res => {
      this.setState({ user: res.data })
    }).catch(error => {
      if (error.status == 404) {
        history.replace("/not_found")
      } else if (error.status = 401) {
        history.replace("/not_authorized")
      }
    })
  }

  render() {
    return(
      <h1>Edit User</h1>
    )
  }
}

LoadUser.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(LoadUser)
