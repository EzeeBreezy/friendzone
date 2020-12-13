import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
   const [isAuthenticated, setAuthenticated] = useState(false)
   const [userId, setUserId] = useState(null)

   const login = useCallback((Id) => {
      setAuthenticated(true)
      setUserId(Id)
      localStorage.setItem(
         storageName,
         JSON.stringify({
            userId: Id,
         })
      )
   }, [])

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))
      if (data) {
         login(data.userId)
      }
   }, [login])

   return { login, isAuthenticated, userId }
}
