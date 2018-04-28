import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Form, FormGroup, FormControl, ControlLabel, Button, Col, HelpBlock } from 'react-bootstrap'

import { userAuthenticatedAction } from '../actions'
import { validateEmail, validatePassword, validatePasswordConfirmation, validateName } from '../lib/validator'
import apiV1 from '../lib/apiV1'
import style from '../style/style'

class SignUp extends Component {

  constructor(props) {
    super(props)
    let initialObject = { value: "", touched: false, valid: true, message: [] }
    this.state = {
      name: initialObject,
      email: initialObject,
      password: initialObject,
      password_confirmation: initialObject,
      full_messages: [],
    }
  }

  handleChange = (e) => {
    let type = e.target.name
    let value = e.target.value || ""
    let self = this
    this.setState({ [type]: { ...this.state[type], value: value, touched: true }},
      () => (this.validateByType(type)))
  }

  validateByType = (type) => {
    let validation
    switch (type) {
      case 'name':
        validation = validateName(this.state.name)
        break
      case 'email':
        validation = validateEmail(this.state.email)
        break
      case 'password':
        validation = validatePassword(this.state.password)
        this.validateByType('password_confirmation')
        break
      case 'password_confirmation':
        validation = validatePasswordConfirmation(this.state.password, this.state.password_confirmation)
        break
      default:
    }
    this.setState({ [type]: validation, full_messages: [] })
  }

  validateForm = () => {
    const { email, password, password_confirmation } = this.state
    return(
      name.touched && name.valid &&
      email.touched && email.valid &&
      password.touched && password.valid &&
      password_confirmation.touched && password_confirmation.valid
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if ( this.validateForm() ) {
      apiV1.createUser(this.formObject()).then( response => {
        this.props.dispatch(userAuthenticatedAction(response.data))
      }).catch( error => error.json().then( errorMessage => {
        this.setState({ full_messages: errorMessage.errors.full_messages })
      }))
    }
  }

  formObject = () => {
    let { name, email, password, password_confirmation } = this.state
    return({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
  }

  render() {
    return (
      <Form className={ style.FormHorizontal } horizontal>
        <FormGroup controlId="formHorizontalName" validationState={
          this.state.name.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={3}>
            Name (optional)
          </Col>
          <Col sm={9}>
            <FormControl type="name" name="name" placeholder="Name" onBlur={this.handleChange} />
            { this.state.name.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail" validationState={
          this.state.email.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={3}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl type="email" name="email" placeholder="Email" onBlur={this.handleChange} />
            { this.state.email.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

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
            <Button onClick={this.handleSubmit} type="submit">Sign in</Button>
          </Col>
        </FormGroup>
        <Col smOffset={3}>
          { this.state.full_messages.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
        </Col>
      </Form>
    )
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(SignUp)
