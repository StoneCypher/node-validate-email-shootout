var assert = require('assert');
require('should');

var validator = require('../lib/validator');

function expectFailure(message, childName, childValue) {
  message.should.not.be.empty;
}

function expectSuccess() {
  assert.fail();
}

describe('validator.isObject', function () {
  it('should pass an object',
    function (done) {
      validator.isObject().validate({}, expectSuccess);
      done();
    });

  it('should fail non-objects',
    function (done) {
      validator.isObject().validate('asd', expectFailure);
      validator.isObject().validate(null, expectFailure);
      validator.isObject().validate(123.4, expectFailure);
      validator.isObject().validate(true, expectFailure);
      validator.isObject().validate(function () {}, expectFailure);
      done();
    });

  it('should fail with unexpected properties',
    function (done) {
      validator.isObject().validate({test: 123}, expectFailure);
      done();
    });

  it('should allow optional properties, but not require them',
    function (done) {
      var v = validator.isObject()
        .withOptional('test');
      v.validate({test: 123}, expectSuccess);
      v.validate({test: null}, expectSuccess);
      v.validate({test: undefined}, expectSuccess);
      v.validate({}, expectSuccess);
      done();
    });

  it('should allow require required properties',
    function (done) {
      var v = validator.isObject()
        .withRequired('test');
      v.validate({test: 123}, expectSuccess);
      v.validate({test: null}, expectFailure);
      v.validate({test: undefined}, expectFailure);
      v.validate({}, expectFailure);
      done();
    });

  it('should validate children',
    function (done) {
      // TODO: put stuff here
      done();
    });

});