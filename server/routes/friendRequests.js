const friendRequestsController = require('../controllers/FriendRequestsController')
const router = require('express').Router();

/* GET home page. */
router.get('/:userId', friendRequestsController.getRequestsForUser);
router.post('/', friendRequestsController.createRequest);

module.exports = router;
