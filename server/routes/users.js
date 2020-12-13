const usersController = require('../controllers/UsersController')
const router = require('express').Router()


router.get('/', usersController.getAllUsers)

module.exports = router
