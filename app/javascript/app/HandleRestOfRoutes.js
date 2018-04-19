import React from 'react'
import { Route, Switch } from 'react-router-dom'

const HandleRestOfRoutes = () => {
  return(
    <Switch>
      <Route exact path="/reset_password" render={()=>(<h1>Reset Password Page</h1>)} />
      <Route render ={ () => <h1>Not Found</h1> } />
    </Switch>
  )
}

export default HandleRestOfRoutes
