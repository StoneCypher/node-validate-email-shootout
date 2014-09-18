var assert = require('assert');
require('should');

var validator = require('../lib/validator');

function expectFailure(message, childName, childValue) {
  message.should.not.be.empty;
}

function expectSuccess() {
  assert.fail();
}

describe('validator.isDate', function () {
  it('should pass Date',
    function (done) {
      validator.isDate().validate(new Date(), expectSuccess);
      done();
    });

  it('should pass unix offset (milliseconds)',
    function (done) {
      validator.isDate().validate(1318781876406, expectSuccess);
      done();
    });

  it('should pass string dates',
    function (done) {
      validator.isDate().validate('2013-02-08', expectSuccess);
      validator.isDate().validate('2013-02-08T09:30:26', expectSuccess);
      validator.isDate().validate('2013-02-08T09:30:26.123', expectSuccess);
      validator.isDate().validate('2013-02-08T09:30:26Z', expectSuccess);
      validator.isDate().validate('2013-02-08T09:30:26+0700', expectSuccess);
      validator.isDate().validate('2013-W06-5T09:30:26', expectSuccess);
      done();
    });

  it('should pass string dates with matching formats and fail valid dates with non-matching formats',
    function (done) {
      validator.isDate({format: 'YYYY-MM-DD'}).validate('2013-02-08', expectSuccess);
      validator.isDate({format: 'YYYY-MM-DD'}).validate('2013-02-08T09:30:26', expectFailure);
      done();
    });

  it('should pass object',
    function (done) {
      validator.isDate().validate({year: 2014, month: 10, day: 14}, expectSuccess);
      done();
    });

  it('should fail invalid dates',
    function (done) {
      validator.isDate().validate('asd', expectFailure);
      validator.isDate().validate(null, expectFailure);
      validator.isDate().validate({}, expectFailure);
      validator.isDate().validate([], expectFailure);
      validator.isDate().validate(function () {}, expectFailure);
      done();
    });

});