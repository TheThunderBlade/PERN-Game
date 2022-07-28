const bcrypt = require('bcrypt');
const models = require('../models');
const ApiError = require('./Error.service');
const UserSessionSvc = require('./UserSession.service');

class AuthService {
  registration = async ({ Email, Password, UserName }) => {
    try {
      const checkingForEmail = await models.User.findOne({ where: { Email } });
      if (checkingForEmail) {
        throw ApiError.conflict('User with this email already exists');
      }
      const checkingForUserName = await models.User.findOne({ where: { UserName } });
      if (checkingForUserName) {
        throw ApiError.conflict('User with this UserName already exists');
      }

      const hashPassword = await bcrypt.hash(Password, 5);

      const user = await models.User.create({ Email, Password: hashPassword, UserName });

      await models.UserProfile.create({ UserId: user.UserId });
      await models.UserResources.create({ UserId: user.UserId });
      await models.ResourcesBuildings.create({ UserId: user.UserId });
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };

  login = async ({ UserName, Password }) => {
    try {
      const user = await models.User.findOne({ where: { UserName } });
      if (!user) {
        throw ApiError.notFound('User with this username not found');
      }
      const password = await bcrypt.compare(Password, user.Password);
      if (!password) {
        throw ApiError.badRequest('Invalid password');
      }
      const userToken = await user.getTokens();
      if (userToken) {
        throw ApiError.badRequest('User is already logged in');
      }

      const tokens = UserSessionSvc.generateTokens({ UserId: user.UserId, Email: user.Email });
      await UserSessionSvc.saveToken({ UserId: user.UserId, RefreshToken: tokens.RefreshToken });

      return {
        ...tokens,
        user,
      };
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };

  refresh = async ({ RefreshToken }) => {
    try {
      if (!RefreshToken) {
        throw ApiError.unauthorized('Invalid refresh token');
      }

      const userData = UserSessionSvc.validateRefreshToken({ RefreshToken });
      const tokenFromDb = await models.UserSession.findOne({ where: { RefreshToken } });

      if (!userData || !tokenFromDb) {
        throw ApiError.unauthorized('Token validation failed');
      }

      const user = await models.User.findOne({ where: { UserId: userData.UserId } });
      const tokens = UserSessionSvc.generateTokens({ UserId: user.UserId, Email: user.Email });
      await UserSessionSvc.saveToken({ UserId: user.UserId, RefreshToken: tokens.RefreshToken });
      return { ...tokens, user };
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };

  logout = async ({ RefreshToken }) => {
    try {
      return UserSessionSvc.removeToken({ RefreshToken });
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };
}

module.exports = new AuthService();