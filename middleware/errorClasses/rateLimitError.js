module.exports = class RateLimitExceededError extends Error {
  constructor () {
    super('Rate limit for Github API exceeded. Wait 15 mins, and try again.');
    this.statusCode = 403;
  }
};
