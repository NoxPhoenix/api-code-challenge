const PullRequestRouter = require('express').Router();
const PullRequestController = require('../controllers/pullRequest');
const Responder = require('../middleware/responder');

PullRequestRouter.route('/')
  .get(PullRequestController.list, Responder);

module.exports = PullRequestRouter;
