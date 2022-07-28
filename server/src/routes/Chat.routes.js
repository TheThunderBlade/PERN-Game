const Router = require('express');
const ChatController = require('../controllers/Chat.controller');
const AuthMiddleware = require('../middlewares/Auth.middleware');

const router = Router();

router.get('/getUserChatList', AuthMiddleware, ChatController.getUserChatList);
router.post('/selectChatRoom', AuthMiddleware, ChatController.selectChatRoom);

module.exports = router;