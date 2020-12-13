const authController = require('../controllers/AuthController')
const router = require('express').Router()

router.post('/', authController.login)

module.exports = router
