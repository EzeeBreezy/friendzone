const FriendRequest = require('../models/FriendRequest')

class FriendRequestsController {
   getRequestsForUser = async (req, res) => {
      const { userId } = req.params
      console.log(`GET /friend-requests/${userId}`)

      try {
         const friendReqs = await FriendRequest.find({
            $or: [{ from: userId }, { to: userId }],
         })
         res.status(200).json({ message: 'Friend requests listing', data: friendReqs })
      } catch (e) {
         console.log(e)
         res.status(500).json({ message: 'Something went wrong' })
      }
   }

   createRequest = async (req, res) => {
      console.log('POST /friend-requests')
      try {
         const { from, to } = req.body
         let friendReq = await FriendRequest.findOne({
            $or: [
               { from, to },
               { from: to, to: from },
            ],
         })
         if (friendReq) {
            res.status(200).json({ message: 'Invitation already exists', data: friendReq })
         } else {
            friendReq = new FriendRequest({ from, to })
            await friendReq.save()
            res.status(201).json({ message: 'Invitation created succesfully', data: friendReq })
         }
      } catch (e) {
         console.log(e)
         res.status(500).json({ message: 'Something went wrong' })
      }
   }
}

const friendRequestsController = new FriendRequestsController()

module.exports = friendRequestsController
