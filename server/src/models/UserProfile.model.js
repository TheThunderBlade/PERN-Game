const db = require('../../db');
const { DataTypes } = require('sequelize');

const UserProfileModel = db.define('UserProfile', {
  ProfileId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  AvatarId: { type: DataTypes.STRING, defaultValue: null },
  WeeksLived: { type: DataTypes.INTEGER, defaultValue: 0 },
  CurrentDay: { type: DataTypes.INTEGER, defaultValue: 1 },
  Energy: { type: DataTypes.INTEGER, defaultValue: 100 },
  UserReputation: { type: DataTypes.INTEGER, defaultValue: 0 },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
});

module.exports = {
  UserProfile: UserProfileModel,
};