module.exports = class ApiError extends Error {
  constructor(status, message, isError) {
    super();
    this.status = status;
    this.message = message;
    this.isError = isError;
  }

  static badRequest(message, isError = true) {
    return new ApiError(400, message, isError);
  }

  static unauthorized(message, isError = true) {
    return new ApiError(401, message, isError);
  }

  static forbidden(message, isError = true) {
    return new ApiError(403, message, isError);
  }

  static notFound(message, isError = true) {
    return new ApiError(404, message, isError);
  }

  static conflict(message, isError = true) {
    return new ApiError(409, message, isError);
  }

  static internal(message, isError = true) {
    return new ApiError(500, message, isError);
  }
}