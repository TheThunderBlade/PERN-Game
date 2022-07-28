const ApiError = require('./Error.service');
const models = require('../models');
const { Op } = require('sequelize');

class FriendListService {
  constructor(user) {
    this.user = user;
  }

  searchFriend = async (userNamePart) => {
    try {
      const candidatesList = await models.User.findAll({
        where: {
          [Op.or]: [
            { UserName: { [Op.substring]: userNamePart } },
          ],
        },
        include: [
          {
            model: models.UserProfile,
            as: 'profiles',
          },
        ],
      });
      return candidatesList.filter((candidate) => candidate.UserId !== this.user.UserId);
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  sendFriendRequest = async (InvitedUserId) => {
    try {
      const requestChecker = await models.FriendRequest.findOne({
        where: {
          UserId: this.user.UserId,
          InvitedUserId,
        }
      });
      const requestFriendChecker = await models.FriendRequest.findOne({
        where: {
          UserId: InvitedUserId,
          InvitedUserId: this.user.UserId,
        }
      });
      if (requestChecker || requestFriendChecker) {
        throw ApiError.conflict('This request already exists. Reject or accept it');
      }
      const friendChecker = await models.FriendList.findOne({
        where: {
          UserId: this.user.UserId,
          FriendId: InvitedUserId,
        }
      });
      if (friendChecker) {
        throw ApiError.conflict('This user has already been added to your friends list');
      }
      await models.FriendRequest.create({
        UserId: this.user.UserId,
        InvitedUserId,
      });
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  getMyRequests = async () => {
    try {
      const requests = await models.FriendRequest.findAll({
        where: {
          UserId: this.user.UserId,
        }
      });
      const InvitedUserIds = requests.map((request) => request.InvitedUserId);
      return await models.User.findAll({
        where: {
          UserId: InvitedUserIds,
        },
        include: [
          {
            model: models.UserProfile,
            as: 'profiles',
          },
        ],
      });
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  removeMyRequest = async (InvitedUserId) => {
    try {
      const request = await models.FriendRequest.findOne({
        where: {
          UserId: this.user.UserId,
          InvitedUserId,
        }
      });
      if (!request) {
        throw ApiError.badRequest('This request does not exist');
      }
      await request.destroy();
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  friendRequests = async () => {
    try {
      const requests = await models.FriendRequest.findAll({
        where: {
          InvitedUserId: this.user.UserId,
        }
      });
      const UserIds = requests.map((request) => request.UserId);
      return await models.User.findAll({
        where: {
          UserId: UserIds,
        },
        include: [
          {
            model: models.UserProfile,
            as: 'profiles',
          },
        ],
      });
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  acceptRequest = async (InvitedUserId) => {
    try {
      const request = await models.FriendRequest.findOne({
        where: {
          UserId: InvitedUserId,
          InvitedUserId: this.user.UserId,
        }
      });

      await models.FriendList.create({
        UserId: request.UserId,
        FriendId: request.InvitedUserId,
      });
      await models.FriendList.create({
        UserId: request.InvitedUserId,
        FriendId: request.UserId,
      });

      await models.ChatRoom.create({
        UserId: request.UserId,
        FriendId: request.InvitedUserId,
      });
      await models.ChatRoom.create({
        UserId: request.InvitedUserId,
        FriendId: request.UserId,
      });
      await request.destroy();
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  declineRequest = async (InvitedUserId) => {
    try {
      const request = await models.FriendRequest.findOne({
        where: {
          UserId: InvitedUserId,
          InvitedUserId: this.user.UserId,
        }
      });

      await request.destroy();
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  getMyFriendList = async () => {
    try {
      const friendList = await models.FriendList.findAll({
        where: {
          UserId: this.user.UserId,
        }
      });

      const FriendIds = friendList.map((listItem) => listItem.FriendId);

      return await models.User.findAll({
        where: {
          UserId: FriendIds,
        },
        include: [
          {
            model: models.UserProfile,
            as: 'profiles',
          },
        ],
      });
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  deleteFriend = async (FriendId) => {
    try {
      const friend = await models.FriendList.findOne({
        where: {
          UserId: this.user.UserId,
          FriendId,
        }
      });
      const userFriend = await models.FriendList.findOne({
        where: {
          UserId: FriendId,
          FriendId: this.user.UserId,
        }
      });
      const chatRoom = await models.ChatRoom.findOne({
        where: {
          UserId: FriendId,
          FriendId: this.user.UserId,
        }
      });
      const friendChatRoom = await models.ChatRoom.findOne({
        where: {
          UserId: FriendId,
          FriendId: this.user.UserId,
        }
      });
      await friend.destroy();
      await userFriend.destroy();
      await chatRoom.destroy();
      await friendChatRoom.destroy();
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };
}

module.exports = FriendListService;