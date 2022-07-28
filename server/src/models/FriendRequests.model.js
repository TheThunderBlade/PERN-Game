const db = require('../../db');
const { DataTypes } = require('sequelize');

const FriendRequest = db.define('FriendRequest', {
  FriendRequestId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
  InvitedUserId: { type: DataTypes.INTEGER, allowNull: false, },
});

module.exports = {
  FriendRequest,
};