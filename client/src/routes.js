import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UsersDetailsPage } from './pages/UserDetailsPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path="/users" exact component={UsersDetailsPage} />
            <Redirect to="/users" />
         </Switch>
      )
   }
   return (
      <Switch>
         <Route path="/auth" exact component={AuthPage} />
         <Redirect to="/auth" />
      </Switch>
   )
}
