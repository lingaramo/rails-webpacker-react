import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Row } from 'react-bootstrap'

import NavBar from './NavBar/NavBar'
import MountApp from './MountApp'
import { validateTokenAction } from './actions'

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(validateTokenAction())
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <NavBar />
        </Row>

        <Row className="show-grid">
          <MountApp currentUser={this.props.currentUser} />
        </Row>
      </Grid>
    )
  }
}

App.propTypes = {
  currentUser: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return{
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(App))
