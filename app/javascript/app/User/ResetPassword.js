import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, FormGroup, FormControl, ControlLabel, Button, Col, HelpBlock } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { validatePassword, validatePasswordConfirmation } from '../lib/validator'
import { userLogoutAction } from '../actions'
import apiV1 from '../lib/apiV1'
import style from '../style/style'

class ResetPassword extends Component {

  constructor(props) {
    super(props)
    let initialObject = { value: "", touched: false, valid: true, message: [] }
    this.state = {
      password: initialObject,
      password_confirmation: initialObject,
      full_messages: [],
    }
  }

  handleChange = (e) => {
    let type = e.target.name
    let value = e.target.value || ""
    this.setState({ [type]: { ...this.state[type], value: value, touched: true }},
      () => (this.validateByType(type)))
  }

  validateByType = (type) => {
    let validation
    switch (type) {
      case 'password':
        validation = validatePassword(this.state.password)
        this.validateByType('password_confirmation')
        break;
      case 'password_confirmation':
        validation = validatePasswordConfirmation(this.state.password, this.state.password_confirmation)
        break;
      default:
    }
    this.setState({ [type]: validation, full_messages: [] })
  }

  validateForm = () => {
    const { password, password_confirmation } = this.state
    return(
      password.touched && password.valid &&
      password_confirmation.touched && password_confirmation.valid
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { location } = this.props
    const params = new URLSearchParams(location.search)
    if ( this.validateForm() ) {
      apiV1.resetPassword( params, this.formObject()).then( response => {
        this.props.dispatch(userLogoutAction(response.data))
        this.props.history.push("/")
      }).catch( error => error.json().then( errorMessage => {
        this.setState({ full_messages: errorMessage.errors })
      }))
    }
  }

  formObject = () => {
    let { password, password_confirmation } = this.state
    return({
      password: password.value,
      password_confirmation: password_confirmation.value
    })
  }

  render() {
    return (
      <div>
        <h1>Reset password</h1>
        <Form className={ style.FormHorizontal } horizontal>
          <FormGroup controlId="formHorizontalPassword" validationState={
            this.state.password.valid && this.state.full_messages.length == 0 ? null : 'error'
          }>
          <Col componentClass={ControlLabel} sm={3}>
            Password
          </Col>
          <Col sm={9}>
            <FormControl type="password" name="password" placeholder="Password" onBlur={this.handleChange} />
            { this.state.password.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPasswordConfirmation" validationState={
            this.state.password_confirmation.valid && this.state.full_messages.length == 0 ? null : 'error'
          }>
          <Col componentClass={ControlLabel} sm={3}>
            Password Confirmation
          </Col>
          <Col sm={9}>
            <FormControl type="password" name="password_confirmation" placeholder="Confirm Password" onBlur={this.handleChange} />
            { this.state.password_confirmation.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button onClick={this.handleSubmit} type="submit">Reset password</Button>
          </Col>
        </FormGroup>
          <Col smOffset={3}>
            { this.state.full_messages.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </Form>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(connect()(ResetPassword))
