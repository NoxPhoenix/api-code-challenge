const chai = require('chai');
const chaiThings = require('chai-things');
const chaiJsonSchema = require('chai-json-schema-ajv');

global.Promise = require('bluebird');
global.sinon = require('sinon');

global.expect = chai.expect;

chai.use(chaiThings);
chai.use(chaiJsonSchema);
