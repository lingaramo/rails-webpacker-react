import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
            <h1>Nav bar</h1>
        </Row>
        
        <Row className="show-grid">
          <h1>App</h1>
        </Row>
      </Grid>
    )
  }
}

App.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return{
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App)