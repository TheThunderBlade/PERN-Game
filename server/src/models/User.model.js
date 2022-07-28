const db = require('../../db');
const { DataTypes } = require('sequelize');

const User = db.define('User', {
  UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserName: { type: DataTypes.STRING, unique: true },
  Email: { type: DataTypes.STRING, unique: true, },
  Password: { type: DataTypes.STRING },
});

module.exports = {
  User,
};