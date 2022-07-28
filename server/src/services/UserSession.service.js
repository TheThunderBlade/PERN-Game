const jwt = require('jsonwebtoken');
const models = require('../models');
const ApiError = require('./Error.service');

class UserSessionService {
  generateTokens = (payload) => {
    const AccessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
    const RefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      AccessToken,
      RefreshToken
    };
  };

  saveToken = async ({ UserId, RefreshToken }) => {
    try {
      const tokenData = await models.UserSession.findOne({ where: { UserId } });
      if (tokenData) {
        return tokenData.update({
          RefreshToken,
        });
      }

      return models.UserSession.create({
        UserId,
        RefreshToken,
      });
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };

  validateRefreshToken = ({ RefreshToken }) => {
    try {
      return jwt.verify(RefreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };

  removeToken = async ({ RefreshToken }) => {
    try {
      return models.UserSession.destroy({ where: { RefreshToken } });
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };

  findToken = async ({ RefreshToken }) => {
    try {
      const token = await models.UserSession.findOne({ where: { RefreshToken } });
      return token;
    } catch (e) {
      console.log(e);
      throw ApiError.internal(e.message);
    }
  };
}

module.exports = new UserSessionService();