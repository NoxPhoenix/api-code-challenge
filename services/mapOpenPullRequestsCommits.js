const got = require('got');

const { githubApiUrl } = require('../config');

const requestOptions = {
  responseType: 'json',
  prefixUrl: githubApiUrl,
};

const buildApiRepositoryPath = (repositoryPath) => `repos${repositoryPath}/pulls`;

const parseUrlForRepositoryName = (repositoryUrl) => {
  const repositoryUrlPattern = /https:\/\/github\.com(\/[a-zA-Z]+\/[a-zA-Z]+)/g;
  return repositoryUrlPattern.exec(repositoryUrl)[1];
};

const appendNumberOfCommitsToPullRequestData = (pullRequest) => ({ body: { commits: numberOfCommits } }) => (
  { ...pullRequest, numberOfCommits }
);

const findNumberOfCommitsForOpenPullRequests = (pullRequests, apiRepositoryPath) => (
  pullRequests.map((pullRequest) => {
    const { state, number } = pullRequest;
    if (state === 'open') {
      return got(`${apiRepositoryPath}/${number}`, requestOptions)
        .then(appendNumberOfCommitsToPullRequestData(pullRequest));
    }
    return Promise.resolve(pullRequest);
  })
);

module.exports = (repositoryUrl) => {
  const repositoryPath = parseUrlForRepositoryName(repositoryUrl);
  const apiRepositoryPath = buildApiRepositoryPath(repositoryPath);
  return got(apiRepositoryPath, requestOptions)
    .then(({ body: pullRequests }) => (
      findNumberOfCommitsForOpenPullRequests(pullRequests, apiRepositoryPath)
    ))
    .then(Promise.all);
};
