const rootRouter = require('express').Router()

rootRouter.use('/auth', require('./auth'))
rootRouter.use('/users', require('./users'))
rootRouter.use('/friend-requests', require('./friendRequests'))

module.exports = rootRouter
