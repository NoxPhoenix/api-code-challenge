const PullRequestRouter = require('./pullRequest');

const Router = (app) => {
  app.use('/api/pull-requests', PullRequestRouter);
};

module.exports = Router;
