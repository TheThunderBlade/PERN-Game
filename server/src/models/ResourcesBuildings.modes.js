const db = require('../../db');
const { DataTypes } = require('sequelize');

const ResourcesBuildings = db.define('ResourcesBuildings', {
  BuildingsListId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CaveLevel: { type: DataTypes.INTEGER, defaultValue: 1 },
  SawmillLevel: { type: DataTypes.INTEGER, defaultValue: 1 },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
});

module.exports = {
  ResourcesBuildings,
};