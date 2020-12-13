import React, { useState, useContext, useCallback, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { UserCard } from '../components/UserCard'

export const UsersDetailsPage = () => {
   const { userId: selfId } = useContext(AuthContext)
   const { request } = useHttp()
   const [usersList, setUsersList] = useState([])
   const [friendReqs, setFriendReqs] = useState([])

   const getUsers = useCallback(async () => {
      try {
         const fetched = await request(`${process.env.REACT_APP_API_URI}/users/`)
         const filtered = fetched.data.filter((user) => user._id !== selfId)
         setUsersList(filtered)
      } catch (e) {}
   }, [request])

   const getFriendRequests = useCallback(async () => {
      try {
         const fetched = await request(`${process.env.REACT_APP_API_URI}/friend-requests/${selfId}`)
         setFriendReqs(fetched.data)
      } catch (e) {}
   }, [request])

   useEffect(() => {
      getUsers()
   }, [getUsers])

   useEffect(() => {
      getFriendRequests()
   }, [getFriendRequests])

   return (
      <>
         <h1>FriendZone</h1>

         {usersList && usersList.map((user) => <UserCard user={user} friendReqs={friendReqs} key={user._id} />)}
      </>
   )
}
