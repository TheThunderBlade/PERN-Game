const db = require('../../db');
const { DataTypes } = require('sequelize');

const FriendList = db.define('FriendList', {
  FriendListId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
  FriendId: { type: DataTypes.INTEGER, allowNull: false, },
});

module.exports = {
  FriendList,
};