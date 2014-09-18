var assert = require('assert');
require('should');

var validator = require('../lib/validator');

function expectFailure(message, childName, childValue) {
  message.should.not.be.empty;
}

function expectSuccess() {
  assert.fail();
}

describe('validator.isInteger', function () {
  it('should pass an integer',
    function (done) {
      validator.isInteger().validate(100, expectSuccess);
      validator.isInteger().validate(0, expectSuccess);
      validator.isInteger().validate(-100, expectSuccess);
      done();
    });

  it('should fail non-integer numbers',
    function (done) {
      validator.isInteger().validate(123.4, expectFailure);
      validator.isInteger().validate(123.0, expectFailure);
      validator.isInteger().validate(0.0, expectFailure);
      validator.isInteger().validate(-123.4, expectFailure);
      done();
    });

  it('should fail non-numbers',
    function (done) {
      validator.isInteger().validate('asd', expectFailure);
      validator.isInteger().validate(null, expectFailure);
      validator.isInteger().validate(true, expectFailure);
      validator.isInteger().validate(function () {}, expectFailure);
      done();
    });

  it('should enforce "min" constraint',
    function (done) {
      validator.isInteger({min: 0}).validate(0, expectSuccess);
      validator.isInteger({min: 0}).validate(1, expectSuccess);
      validator.isInteger({min: 0}).validate(-1, expectFailure);
      done();
    });

  it('should enforce "max" constraint',
    function (done) {
      validator.isInteger({max: 10}).validate(10, expectSuccess);
      validator.isInteger({max: 10}).validate(11, expectFailure);
      validator.isInteger({max: 10}).validate(9, expectSuccess);
      done();
    });

});