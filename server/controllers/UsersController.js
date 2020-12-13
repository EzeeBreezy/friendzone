const User = require('../models/User')

class UsersController {
   getAllUsers = async (req, res) => {
      try {
         const users = await User.find({})
         res.status(200).json({ message: 'Users listing', data: users })
      } catch (e) {
         console.log(e)
         res.status(500).json({ message: 'Something went wrong' })
      }
   }
}

const usersController = new UsersController()

module.exports = usersController
