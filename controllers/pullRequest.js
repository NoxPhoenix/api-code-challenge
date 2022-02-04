const pullRequestController = {
  list (req, res, next) {
    req.state.body = {};
    return next();
  },
};

module.exports = pullRequestController;
