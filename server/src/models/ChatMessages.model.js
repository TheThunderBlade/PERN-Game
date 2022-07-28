const db = require('../../db');
const { DataTypes } = require('sequelize');

const ChatMessages = db.define('ChatMessages', {
  MessageId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Message: { type: DataTypes.TEXT, defaultValue: '' },
  SenderId: { type: DataTypes.INTEGER, allowNull: false, },
  ChatRoomId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
});

module.exports = {
  ChatMessages,
};