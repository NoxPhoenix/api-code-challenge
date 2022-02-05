const { expect } = require('chai');
const got = require('got');
const { it } = require('mocha');

const config = require('../../config');
const pullRequestSchema = require('./schemas/pullRequest');

const makeRequest = (uri) => function () {
  return got(`${config.targetUrl}:${config.port}/${uri}`, { responseType: 'json' })
    .then((response) => {
      this.responseBody = response.body;
    });
};

const itBehavesLikeItRespondsWithPullRequestSchema = () => (
  it('responds with all items matching pullRequest schema', function () {
    expect(this.responseBody).to.have.property('data')
      .that.is.an('array')
      .that.all.are.jsonSchema(pullRequestSchema);
  })
);

const itBehavesLikeOpenPullRequestsHaveNumberOfCommitsProperty = () => (
  it('has numberOfCommits property if pull request state is open', function () {
    this.responseBody.data.map(({ state, numberOfCommits = null }) => {
      if (state === 'open') return expect(numberOfCommits).to.be.a('number');
      return expect(numberOfCommits.to.be.null);
    });
  })
);

describe('/api/pull-requests', function () {
  describe('/:repositoryUrl', function () {
    before('make request', makeRequest('pull-requests/123'));
    itBehavesLikeItRespondsWithPullRequestSchema();
    itBehavesLikeOpenPullRequestsHaveNumberOfCommitsProperty();
  });
});
