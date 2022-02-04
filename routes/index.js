const PullRequestRouter = require('./pullRequest');

const Router = (app) => {
  app.use('/pull-requests', PullRequestRouter);
};

module.exports = Router;
