module.exports = class InvalidUrlError extends Error {
  constructor () {
    super('Required query param: url is in invalid format. Use \'https://github.com/<user>/<repoName>\'');
    this.statusCode = 400;
  }
};
