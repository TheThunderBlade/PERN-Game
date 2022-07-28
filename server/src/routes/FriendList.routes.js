const AuthMiddleware = require('../middlewares/Auth.middleware');
const FriendListController = require('../controllers/FriendList.controller');
const Router = require('express');

const router = Router();

router.post('/searchFriend', AuthMiddleware, FriendListController.searchFriend);
router.post('/sendFriendRequest', AuthMiddleware, FriendListController.sendFriendRequest);
router.get('/getMyRequests', AuthMiddleware, FriendListController.getMyRequests);
router.post('/removeMyRequest', AuthMiddleware, FriendListController.removeMyRequest);
router.get('/friendRequests', AuthMiddleware, FriendListController.friendRequests);
router.post('/acceptRequest', AuthMiddleware, FriendListController.acceptRequest);
router.post('/declineRequest', AuthMiddleware, FriendListController.declineRequest);
router.get('/getMyFriendList', AuthMiddleware, FriendListController.getMyFriendList);
router.post('/deleteFriend', AuthMiddleware, FriendListController.deleteFriend);

module.exports = router;