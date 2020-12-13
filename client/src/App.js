import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import 'materialize-css'

function App() {
   const { isAuthenticated, login, userId, name } = useAuth()
   const routes = useRoutes(isAuthenticated)
   return (
      <AuthContext.Provider
         value={{
            userId,
            login,
            isAuthenticated,
            name
         }}
      >
         <Router>
            <div className="container">{routes}</div>
         </Router>
      </AuthContext.Provider>
   )
}

export default App
