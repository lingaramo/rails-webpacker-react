import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Form, FormGroup, FormControl, ControlLabel, Button, Col, HelpBlock } from 'react-bootstrap'

import { validateTokenAction, invalidateUsersList } from '../actions'
import { validateEmail, validatePassword, validatePasswordConfirmation, validateName } from '../lib/validator'
import apiV1 from '../lib/apiV1'
import style from '../style/style'

class EditUser extends Component {


  constructor(props) {
    super(props)
    let initialObject = { value: "", touched: false, valid: true, message: [] }
    this.state = {
      name: { value: (props.name || ""), touched: false, valid: true, message: [] },
      email: { value: (props.email || ""), touched: false, valid: true, message: [] },
      password: initialObject,
      password_confirmation: initialObject,
      role: { value: (props.role || "user"), touched: false, valid: true, message: [] },
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
    let validation = this.state[type]
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
    const { name, email, password, password_confirmation } = this.state
    return(
      name.valid &&
      email.valid &&
      password.valid &&
      password_confirmation.valid
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { userId, dispatch, history, currentUser, users } = this.props
    if ( this.validateForm() ) {
      apiV1.updateUser( userId, this.formObject()).then( response => {
        if (currentUser.id == userId) { dispatch(validateTokenAction()) }
        if (users.data.find( element => element.id == userId)) {
          dispatch(invalidateUsersList())
        }
        history.push('/admin')
      }).catch( error => error.json().then( errorMessage => {
        this.setState({ full_messages: errorMessage.errors.full_messages })
      }))
    }
  }

  formObject = () => {
    let { name, email, password, password_confirmation, role } = this.state
    let payload = { name: name.value, email: email.value, role: role.value }
    if (password.value != "" && password_confirmation.value != "") {
      payload['password'] = password.value
      payload['password_confirmation'] = password_confirmation.value
    }
    return payload
  }

  render() {
    const { name, email, role } = this.state
    const { currentUser } = this.props
    const RoleSelector = () => {
      if (currentUser.role == 'admin') {
        return(
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={3}>
              Role
            </Col>
            <Col sm={9}>
              <FormControl type="select" name="role" componentClass="select"
                placeholder="select" defaultValue={role.value} onChange={this.handleChange}
                >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </FormControl>
            </Col>
          </FormGroup>
        )
      } else {
        return null
      }
    }

    return (
      <Form className={ style.FormHorizontal } horizontal>
        <FormGroup controlId="formHorizontalName" validationState={
          this.state.name.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={3}>
            Name (optional)
          </Col>
          <Col sm={9}>
            <FormControl type="name" name="name" placeholder="Name" defaultValue={name.value} onBlur={this.handleChange} />
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
            <FormControl type="email" name="email" placeholder="Email" defaultValue={email.value} onBlur={this.handleChange} />
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

        <RoleSelector />

        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button onClick={this.handleSubmit} type="submit">Update</Button>
          </Col>
        </FormGroup>
        <Col smOffset={3}>
          { this.state.full_messages.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
        </Col>
      </Form>
    )
  }
}

EditUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser,
    users: state.users
  })
}

export default withRouter(connect(mapStateToProps)(EditUser))
