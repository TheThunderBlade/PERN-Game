const ApiError = require('../services/Error.service');

module.exports = function (err, req, res, next) {
  try {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.status).json({ status: err.status, message: err.message, isError: err.isError });
    }
    return res.status(500).json({ message: 'Unexpected error' });
  } catch (e) {
    next(e);
  }
};