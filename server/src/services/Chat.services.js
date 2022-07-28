const ApiError = require('./Error.service');
const models = require('../models');

class ChatServices {
  constructor(user) {
    this.user = user;
  }

  getUserChatList = async () => {
    try {
      const rooms = await models.ChatRoom.findAll({ where: {
        UserId: this.user.UserId,
      }});

      const friendIds = rooms.map((room) => room.FriendId);
      console.log(friendIds);
      return  await models.User.findAll({
        where: {
          UserId: friendIds,
        },
        include: [
          {
            model: models.UserProfile,
            as: 'profiles',
          },
          {
            model: models.ChatRoom,
            as: 'chatRooms',
            include: [
              {
                model: models.ChatMessages,
                as: 'chatMessages',
              }
            ]
          },
        ],
      });
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }

  selectChatRoom = async ({ ChatRoomId }) => {
    try {
      return await models.ChatMessages.findAll({
        where: { ChatRoomId },
        limit: 10,
        offset: 0,
      })
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }
}

module.exports = ChatServices;