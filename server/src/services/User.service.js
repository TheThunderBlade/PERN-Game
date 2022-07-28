const ApiError = require('./Error.service');
const bcrypt = require('bcrypt');
const models = require('../models');

class UserService {
  constructor(user) {
    this.user = user;
  }

  getProfile = async () => {
    try {
      const profile = await this.user.getProfiles();
      const requests = await models.FriendRequest.findAll({ where: {
          InvitedUserId: this.user.UserId,
        }});
      return { profile, requests };
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  updateProfile = async ({ UserName, Password, AvatarId }) => {
    try {
      const profile = await this.user.getProfiles();
      if (AvatarId) {
        await profile.update({
          AvatarId,
        });
      }
      let options = {};
      if (UserName) {
        const checkingForUserName = await models.User.findOne({ where: { UserName } });
        if (checkingForUserName) {
          throw ApiError.conflict('User with this UserName already exists');
        }
        options = { ...options, UserName };
      }
      if (Password) {
        const hashPassword = await bcrypt.hash(Password, 5);
        options = { ...options, Password: hashPassword };
      }
      await this.user.update(options)
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };
}

module.exports = UserService;