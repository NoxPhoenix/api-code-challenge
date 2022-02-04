const PullRequestRouter = require('express').Router();
const PullRequestController = require('../controllers/pullRequest');
const Responder = require('../middleware/responder');

PullRequestRouter.route('/:repositoryUrl')
  .get(PullRequestController.list, Responder)

module.exports = PullRequestRouter;