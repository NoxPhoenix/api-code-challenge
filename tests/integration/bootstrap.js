const chai = require('chai');
const chaiThings = require('chai-things');

global.Promise = require('bluebird');

global.expect = chai.expect;

chai.use(chaiThings);
