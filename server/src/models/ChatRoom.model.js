const db = require('../../db');
const { DataTypes } = require('sequelize');

const ChatRoom = db.define('ChatRoom', {
  ChatRoomId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
  FriendId: { type: DataTypes.INTEGER, allowNull: false, },
});

module.exports = {
  ChatRoom,
};
