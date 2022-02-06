const _ = require('lodash');

const mapOpenPullRequestsNumberOfCommitsService = require('../services/mapOpenPullRequestsCommits');
const RateLimitExceededError = require('../middleware/errorClasses/rateLimitError');
const InvalidUrlError = require('../middleware/errorClasses/invalidUrlError');
const MissingParamError = require('../middleware/errorClasses/missingParamError');

const responseFields = [
  'title',
  'number',
  'numberOfCommits',
];

const SanitizeUrlParam = (repositoryUrlParam) => {
  const repositoryUrlPattern = /(https:\/\/github\.com\/[a-zA-Z]+\/[a-zA-Z]+)/g;
  const patternMatch = repositoryUrlPattern.exec(repositoryUrlParam);
  if (!patternMatch) return false;
  return _.first(patternMatch);
};

const serializeResponse = (pullRequests = []) => (
  _.map(pullRequests, _.partialRight(_.pick, responseFields))
);

const pullRequestController = {
  async list (req, res, next) {
    if (!req.query.url) return next(new MissingParamError('url'));
    const sanitizedRepositoryUrl = SanitizeUrlParam(req.query.url);
    if (!sanitizedRepositoryUrl) return next(new InvalidUrlError());

    const pullRequests = await mapOpenPullRequestsNumberOfCommitsService(sanitizedRepositoryUrl)
      .catch((err) => {
        if (err.message.includes('rate limit exceeded')) return next(new RateLimitExceededError());
        return next(err);
      });

    req.state.body = serializeResponse(pullRequests);
    return next();
  },
};

module.exports = pullRequestController;
