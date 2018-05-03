import React from 'react'

import EditUser from '../shared/EditUser'

const NewUser = props => {
  return(
    <div>
      <EditUser action='create' redirectTo='/admin' />
    </div>
  )
}

export default NewUser
