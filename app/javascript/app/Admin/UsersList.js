import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'react-bootstrap'

const UsersList = ({ users }) => {

  const UserItem = user => {
    const { id, name, email, role } = user.attributes
    return(
      <tr>
        <td>{ id }</td>
        <td>{ name }</td>
        <td>{ email }</td>
        <td>{ role }</td>
      </tr>
    )
  }


  return(

    <Table responsive>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        { users.data.map(user => <UserItem key={user.id} { ...user } />) }
      </tbody>
    </Table>
  )
}

UsersList.propTypes = {
  users: PropTypes.object.isRequired
}

export default UsersList
