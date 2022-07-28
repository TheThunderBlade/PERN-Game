const db = require('../../db');
const { DataTypes } = require('sequelize');

const QuestsList = db.define('QuestsList', {
  QuestListId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FirstQuestId: { type: DataTypes.INTEGER, defaultValue: null },
  SecondQuestId: { type: DataTypes.INTEGER, defaultValue: null },
  ThirdQuestId: { type: DataTypes.INTEGER, defaultValue: null },
  UserId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false, },
});

module.exports = {
  QuestsList,
};