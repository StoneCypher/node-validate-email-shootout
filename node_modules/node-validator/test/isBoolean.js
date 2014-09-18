var assert = require('assert');
require('should');

var validator = require('../lib/validator');

function expectFailure(message, childName, childValue) {
  message.should.not.be.empty;
}

function expectSuccess() {
  assert.fail();
}

describe('validator.isBoolean', function () {
  it('should pass boolean',
    function (done) {
      validator.isBoolean().validate(true, expectSuccess);
      validator.isBoolean().validate(false, expectSuccess);
      done();
    });

  it('should fail non-booleans',
    function (done) {
      validator.isBoolean().validate('asd', expectFailure);
      validator.isBoolean().validate(null, expectFailure);
      validator.isBoolean().validate(0, expectFailure);
      validator.isBoolean().validate(1, expectFailure);
      validator.isBoolean().validate(123.5, expectFailure);
      validator.isBoolean().validate({}, expectFailure);
      validator.isBoolean().validate([], expectFailure);
      validator.isBoolean().validate(function () {}, expectFailure);
      done();
    });

});