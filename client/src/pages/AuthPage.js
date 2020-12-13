import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
   const auth = useContext(AuthContext)
   const message = useMessage()
   const { loading, error, request, clearError } = useHttp()
   const [form, setForm] = useState({
      name: ''
   })

   useEffect(() => {
      message(error)
      clearError()
   }, [error, clearError, message])

   useEffect(() => {
      window.M.updateTextFields()
   }, [])

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value })
   }
   const loginHandler = async () => {
      try {
         const data = await request(`${process.env.REACT_APP_API_URI}/auth/`, 'POST', { ...form })
         auth.login(data.user._id)
      } catch (e) {}
   }
   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <h1>FriendZone</h1>
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <div className="input-field">
                     <input
                        placeholder="Enter your name"
                        id="name"
                        type="text"
                        name="name"
                        className="yellow-input"
                        value={form.name}
                        onChange={changeHandler}
                     />
                     <label htmlFor="name">Name</label>
                  </div>
               </div>
               <div className="card-action">
                  <button
                     className="btn yellow darken-4"
                     style={{ marginRight: 10 }}
                     disabled={loading}
                     onClick={loginHandler}
                  >
                     Login
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}
