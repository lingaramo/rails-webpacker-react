import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import EditUser from '../shared/EditUser'
import apiV1 from '../lib/apiV1'

class LoadUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        isFetching: true
      }
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { history } = this.props

    apiV1.getUser( id ).then( res => {
      this.setState({ user: { ...res.data, isFetching: false }})
    }).catch(error => {
      if (error.status == 404) {
        history.replace("/not_found")
      } else if (error.status == 403) {
        history.replace("/not_authorized")
      }
    })
  }

  render() {
    const Result = () => {
      if (this.state.user.isFetching) {
        return(<h1>Loading...</h1>)
      } else {
        return( <EditUser {...this.state.user.attributes }
          userId={this.state.user.id} action='update'
          redirectTo='/admin' allowBlankPassword={true}
        /> )
      }
    }

    return(
      <div>
        <Result />
      </div>
    )
  }
}

LoadUser.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(LoadUser)
