const User = require('../models/User')

class AuthController {
   login = async (req, res) => {
      try {
         const { name } = req.body
         let user = await User.findOne({ name })
         if (user) {
            res.status(201).json({ message: 'User found', user })
         } else {
            user = new User({ name })
            await user.save()
            res.status(201).json({ message: 'User created succesfully', user })
         }
      } catch (e) {
         console.log(e)
         res.status(500).json({ message: 'Something went wrong' })
      }
   }
}

const authController = new AuthController()

module.exports = authController