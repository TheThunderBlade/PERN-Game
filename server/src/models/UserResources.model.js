const db = require('../../db');
const { DataTypes } = require('sequelize');

const UserResourcesModel = db.define('UserResources', {
  UserResourcesId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Money: { type: DataTypes.INTEGER, defaultValue: 0 },
  Wood: { type: DataTypes.INTEGER, defaultValue: 0 },
  WoodBeam: { type: DataTypes.INTEGER, defaultValue: 0 },
  Stone: { type: DataTypes.INTEGER, defaultValue: 0 },
  Iron: { type: DataTypes.INTEGER, defaultValue: 0 },
  Gold: { type: DataTypes.INTEGER, defaultValue: 0 },
  Diamond: { type: DataTypes.INTEGER, defaultValue: 0 },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
});

module.exports = {
  UserResources: UserResourcesModel,
};