const db = require('../../db');
const { DataTypes } = require('sequelize');

const UserSession = db.define('UserSession', {
  TokenId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  RefreshToken: { type: DataTypes.STRING },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
});

module.exports = {
  UserSession,
};