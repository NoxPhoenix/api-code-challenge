const { expect } = require('chai');
const got = require('got');
const { it } = require('mocha');

const config = require('../../config');
const pullRequestSchema = require('./schemas/pullRequest');

const makeRequest = (uri, overridingSearchParams = {}) => function () {
  const requestOptions = {
    responseType: 'json',
    throwHttpErrors: false,
    searchParams: {
      url: 'https://github.com/colinhacks/zod',
      ...overridingSearchParams,
    },
  };

  return got(`${config.targetUrl}:${config.port}/${uri}`, requestOptions)
    .then((response) => {
      this.response = response;
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

const itBehavesLikeItRespondsWithStatusCode = (statusCode) => (
  it(`responds with ${statusCode} status code`, function () {
    expect(this.response.statusCode).to.equal(statusCode);
  })
);

describe('/api/pull-requests', function () {
  describe('/:repositoryUrl', function () {
    context('when a valid url param is used', function () {
      before('make request', makeRequest('api/pull-requests/'));
      itBehavesLikeItRespondsWithPullRequestSchema();
      itBehavesLikeOpenPullRequestsHaveNumberOfCommitsProperty();
    });
    context('when an invalid url format is used', function () {
      before('make request', makeRequest('api/pull-requests/', { url: 'INVALID URL' }));
      itBehavesLikeItRespondsWithStatusCode(400);
      it('contains error message warning about proper url param', function () {
        const errorMessage = 'Required query param: url is in invalid format. Use \'https://github.com/<user>/<repoName>\'';
        expect(this.responseBody).to.have.property('message', errorMessage);
      });
    });
  });
});
