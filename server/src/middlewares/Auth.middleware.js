const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers['x-access-token'] || req.headers.Authorization;
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await models.User.findOne({ where: { UserId: decoded.UserId } });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};