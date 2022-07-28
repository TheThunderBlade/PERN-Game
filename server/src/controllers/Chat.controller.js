const ChatService = require('../services/Chat.services');

class ChatController {
  getUserChatList = async (req, res, next) => {
    try {
      const { user } = req;
      const ChatSvc = new ChatService(user);
      const UserChatList = await ChatSvc.getUserChatList();
      res.status(200).json(UserChatList);
    } catch (e) {
      next(e);
    }
  }

  selectChatRoom = async (req, res, next) => {
    try {
      const { user } = req;
      const { ChatRoomId } = req.body;
      const ChatSvc = new ChatService(user);
      const messages = await ChatSvc.selectChatRoom({ ChatRoomId });
      res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ChatController();