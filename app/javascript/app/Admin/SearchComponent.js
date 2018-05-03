import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

import { searchQueryAction, invalidateUsersList, fetchUsersAction } from '../actions'

const SearchComponent = props => {
  const { dispatch, searchQuery } = props

  const handleSubmit = e => {
    e.preventDefault()
    const searchString = document.getElementById("formInlineSearch").value
    if (searchQuery.search != searchString) {
      dispatch(searchQueryAction(searchString))
      dispatch(invalidateUsersList())
      dispatch(fetchUsersAction())
    }
  }

  const handleClear = e => {
    e.preventDefault()
    document.getElementById("formInlineSearch").value = ""
    if (searchQuery.search != '') {
      dispatch(searchQueryAction(''))
      dispatch(invalidateUsersList())
      dispatch(fetchUsersAction())
    }
  }

  return(
    <Form inline>
      <FormGroup controlId="formInlineSearch">
        <FormControl type="text" name="search" placeholder="Search" />
      </FormGroup>{' '}
      <Button type="submit" onClick={handleSubmit}>Filter</Button>{' '}
      <Button type="submit" onClick={handleClear}>Clear</Button>
    </Form>
  )
}

SearchComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchQuery: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return({
    searchQuery: state.searchQuery,
  })
}

export default connect(mapStateToProps)(SearchComponent)
