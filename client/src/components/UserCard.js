import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const UserCard = ({ user, friendReqs }) => {
   const { userId: selfId } = useContext(AuthContext)
   const { error, request, clearError } = useHttp()
   const message = useMessage()

   const associated = friendReqs.filter((friendReq) => friendReq.to[0] === user._id || friendReq.from[0] === user._id)
   const accepted = !!associated.filter((friendReq) => friendReq.accepted === true).length
   const inviteSent = !!associated.filter((friendReq) => friendReq.accepted === false && friendReq.to[0] === user._id)
      .length
   const inviteReceived = !!associated.filter(
      (friendReq) => friendReq.accepted === false && friendReq.from[0] === user._id
   ).length
   console.log(associated)

   useEffect(() => {
      message(error)
      clearError()
   }, [error, clearError, message])

   useEffect(() => {
      window.M.updateTextFields()
   }, [])

   const btnHandler = async (action) => {
      try {
         const data = await request(`${process.env.REACT_APP_API_URI}/friend-requests/`, 'POST', {
            from: selfId,
            to: user._id,
            action,
         })
         console.log(data)
      } catch (e) {}
   }

   console.log('reqs:', friendReqs)

   return (
      <>
         <div className="row">
            <div className="col s12">
               <div className={accepted ? 'card teal darken-1' : 'card blue-grey darken-1'}>
                  <div className="card-content white-text">
                     <span className="card-title">
                        <i className="material-icons">face</i>
                        <span>&nbsp;{user.name}</span>
                        {accepted && <span className="right">FRIENDED </span>}
                        {!accepted && !inviteSent && !inviteReceived && (
                           <>
                              <i className="material-icons right" onClick={()=>btnHandler('create')}>
                                 person_add
                              </i>
                              <span className="right">INVITE </span>
                           </>
                        )}
                        {!accepted && inviteReceived && (
                           <>
                              <i className="material-icons right" onClick={() => console.log('deny')}>
                                 close
                              </i>
                              <i className="material-icons right" onClick={() => console.log('accept')}>
                                 check
                              </i>
                              <span className="right">INVITE RECEIVED </span>
                           </>
                        )}
                        {!accepted && inviteSent && <span className="right">INVITE SENT</span>}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
