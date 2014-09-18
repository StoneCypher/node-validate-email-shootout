var moment = require('moment');

exports.run = run;
exports.express = expressMiddleWare;
exports.expressParams = expressParamsMiddleWare;
exports.expressQuery = expressQueryMiddleWare;
exports.isObject = isObject;
exports.isString = isString;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isDate = isDate;
exports.isIsoDate = isIsoDate;
exports.isAnyObject = isAnyObject;
exports.isArray = isArray;

function run(validator, value, callback) {
  var errors = [];

  function onError(message, childName, childValue) {
    errors.push({
      parameter: childName,
      value: childValue,
      message: message
    });
  }

  validator.validate(value, onError);
  callback(errors.length, errors);
}

function expressMiddleWare(check) {
  return function checkBody(req, res, next) {
    run(check, req.body, function(errors, details) {
      if (errors > 0) {
        res.send(400, {errors: details});
        return;
      }
      next();
    });
  }
}

function expressParamsMiddleWare(check) {
  return function checkBody(req, res, next) {
    run(check, req.params, function(errors, details) {
      if (errors > 0) {
        res.send(400, {errors: details});
        return;
      }
      next();
    });
  }
}

function expressQueryMiddleWare(check) {
  return function checkBody(req, res, next) {
    run(check, req.query, function(errors, details) {
      if (errors > 0) {
        res.send(400, {errors: details});
        return;
      }
      next();
    });
  }
}

function isObject() {
  var v = {
    withRequired: required,
    withOptional: optional,
    withCustom: custom,
    validate: validate
  };

  var rules = {};
  var globalRules = [];

  return v;

  function required(name, validator) {
    rules[name] = { required: true, validator: validator };
    return v;
  }

  function optional(name, validator) {
    rules[name] = { validator: validator };
    return v;
  }

  function custom(customValidator) {
    globalRules.push({ validator: { validate: customValidator } });
    return v;
  }

  function validate(value, onError) {
    if (typeof value !== 'object') {
      onError('Incorrect type. Expected object.');
      return;
    }

    // check for unexpected values
    for (var parameter in value) {
      if (rules[parameter]) {
        continue;
      }

      onError('Unexpected value.', parameter, value[parameter]);
    }

    // check rules
    for (var parameterName in rules) {
      var parameterValue = value[parameterName];
      var rule = rules[parameterName];

      if ((parameterValue === undefined || parameterValue === null) && rule.required) {
        onError('Required value.', parameterName, parameterValue);
        continue;
      }

      if (parameterValue === undefined || parameterValue === null || !rule.validator) {
        continue;
      }

      function bubbleError(message, childName, childValue) {
        var name;
        if (childName) {
          if (childName[0] === '[') {
            name = parameterName + childName;
          } else {
            name = parameterName + '.' + childName;
          }
        } else {
          name = parameterName;
        }
        onError(message, name, childValue !== undefined ? childValue : parameterValue)
      }

      if (rule.validator) {
        rule.validator.validate(parameterValue, bubbleError);
      }
    }

    // global rules
    for (var i in globalRules) {
      var globalRule = globalRules[i];

      if (globalRule.validator) {
        globalRule.validator.validate(value, onError);
      }
    }

  }
}

function isString(options) {
  return {
    validate: validate
  };

  function validate(value, onError) {
    if (typeof value !== 'string') {
      return onError('Incorrect type. Expected string.');
    }
    if (options) {
      if (options.regex && !options.regex.test(value)) {
        return onError(options.message || 'Invalid value. Value must match required pattern.');
      }
    }
    return null;
  }
}

function isBoolean() {
  return {
    validate: validate
  };

  function validate(value, onError) {
    if (typeof value !== 'boolean') {
      return onError('Incorrect type. Expected boolean.');
    }
    return null;
  }
}

function isNumber(options) {
  return {
    validate: validate
  };

  function validate(value, onError) {
    if (typeof value !== 'number' && isNaN(value)) {
      return onError('Incorrect type. Expected number.');
    }
    if (options) {
      if (options.min && value < options.min) {
        return onError('Value must be greater than or equal to ' + options.min + '.');
      }
      if (options.max && value > options.max) {
        return onError('Value must be less than or equal to ' + options.max + '.');
      }
    }
    return null;
  }
}

function isInteger(options) {
  return {
    validate: validate
  };

  function validate(value, onError) {
    if (typeof value !== 'number' && isNaN(value)) {
      return onError('Incorrect type. Expected number.');
    }
    if (!/-?\d+/.test(value)) {
      return onError('Value must be integer (whole number).');
    }
    if (options) {
      if (options.min && value < options.min) {
        return onError('Value must be greater than or equal to ' + options.min + '.');
      }
      if (options.max && value > options.max) {
        return onError('Value must be less than or equal to ' + options.max + '.');
      }
    }
    return null;
  }
}

function isDate(options) {
  options = options || {};

  return {
    validate: validate
  };

  function validate(value, onError) {
    if (value instanceof Date) {
      return null;
    }
    if (options.format) {
      if (!moment(value, options.format, true).isValid()) {
        return onError(options.message || ('Invalid value. Format is not valid. Expected ' + options.format));
      }
    } else {
      if (!moment(value).isValid()) {
        return onError(options.message || 'Invalid value. Format is not valid.');
      }
    }
    return null;
  }
}

function isIsoDate(options) {
  options = options || {};
  options.format = 'YYYY-MM-DD';
  return isDate(options);
}

function isAnyObject() {
  return {
    validate: validate
  };

  function validate(value, onError) {
    if (typeof value !== 'object') {
      return onError('Incorrect type. Expected object.');
    }
    return null;
  }
}

function isArray(validator, options) {
  return {
    validate: validate
  };

  function validate(value, onError) {
    if (!(value instanceof Array)) {
      return onError('Incorrect type. Expected array.');
    }
    if (options) {
      if (options.min && value.length < options.min) {
        return onError('Count must be greater than or equal to ' + options.min + '.', 'length', value.length);
      }
      if (options.max && value.length > options.max) {
        return onError('Count must be less than or equal to ' + options.max + '.', 'length', value.length);
      }
    }
    if (validator) {
      for (var j in value) {
        function bubbleError(message, childName, childValue) {
          onError(message, childName ? '[' + j + '].' + childName : '[' + j + ']', childValue !== undefined ? childValue : value[j])
        }

        validator.validate(value[j], bubbleError);
      }
    }
    return null;
  }
}
