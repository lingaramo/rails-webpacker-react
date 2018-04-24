import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { Table } from 'react-bootstrap'

import { fetchPaginatedUsersAction } from '../actions'

const UsersList = ({ users, dispatch }) => {

  const UserItem = user => {
    const id = user.id
    const { name, email, role } = user.attributes
    return(
      <tr>
        <td>{ id }</td>
        <td>{ name }</td>
        <td>{ email }</td>
        <td>{ role }</td>
        <td>
          <Link to={"/admin/user/" + id + "/edit"}>
            Edit
          </Link>
        </td>
      </tr>
    )
  }

  const nextPage = (atr) => {
    if (users.links.next != undefined) {
      dispatch(fetchPaginatedUsersAction( users.links.next ))
    }
  }

  return(
    <div>
      <h1>
        Users List
      </h1>

      <InfiniteScroll
        pageStart={0}
        loadMore={nextPage}
        initialLoad={ false }
        hasMore={ users.links.next != undefined }
        loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <Table responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { users.data.map( user => <UserItem key={user.id} { ...user } />) }
            </tbody>
          </Table>
        </InfiniteScroll>
    </div>

  )
}

UsersList.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(UsersList)
