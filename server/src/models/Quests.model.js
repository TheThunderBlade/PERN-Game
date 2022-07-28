const db = require('../../db');
const { DataTypes } = require('sequelize');

const Quests = db.define('Quests', {
  QuestId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  QuestRequirements: { type: DataTypes.STRING },
  MoneyForDoing: { type: DataTypes.INTEGER },
  ReputationForDoing: { type: DataTypes.INTEGER },
});

module.exports = {
  Quests,
};