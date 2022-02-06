const { expect } = require('chai');
const proxyQuire = require('proxyquire');

const sandbox = sinon.createSandbox();

const samplePullRequests = [
  {
    title: 'A cool open PR',
    state: 'open',
    number: 5,
  },
  {
    title: 'A bad closed PR',
    state: 'closed',
    number: 6,
  },
];

describe('services/mapOpenPullRequestsCommits', function () {
  context('when the repository has prs', function () {
    const gotStub = sandbox.stub();
    gotStub
      .onFirstCall()
      .resolves({ body: samplePullRequests });
    gotStub
      .resolves({ body: { commits: 100 } });

    const mapOpenPullRequestsNumberOfCommitsService = proxyQuire('../../../services/mapOpenPullRequestsCommits', {
      got: gotStub,
    });
    it('only sets number of commits property if the pr state is open', async function () {
      const results = await mapOpenPullRequestsNumberOfCommitsService('https://github.com/sampleUser/sampleRepo');
      expect(results).to.be.an('array')
        .that.all.satisfy((pullRequest) => {
          if (pullRequest.state === 'open') return expect(pullRequest).to.have.property('numberOfCommits', 100);
          return expect(pullRequest).to.not.have.property('numberOfCommits');
        });
    });
  });
  context('when the repository has 0 prs', function () {
    const gotStub = sandbox.stub();
    gotStub
      .onFirstCall()
      .resolves({ body: [] });
    gotStub
      .resolves({ body: { commits: 100 } });

    const mapOpenPullRequestsNumberOfCommitsService = proxyQuire('../../../services/mapOpenPullRequestsCommits', {
      got: gotStub,
    });
    it('only sets number of commits property if the pr state is open', async function () {
      const results = await mapOpenPullRequestsNumberOfCommitsService('https://github.com/sampleUser/sampleRepo');
      expect(results).to.be.an('array')
        .that.is.empty;
    });
  });
});
