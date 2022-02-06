module.exports = class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing required query param: ${paramName}`);
    this.statusCode = 400;
  }
};
