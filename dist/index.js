'use strict';

var jsonPredicates = require('./json-predicates');

var mtype = function mtype(typePredicates) {
  typePredicates = typePredicates || jsonPredicates;

  var keys = Object.keys(typePredicates);

  var is = function is(subject, typename) {
    return typePredicates[typename] && typePredicates[typename](subject);
  };

  var isOnly = function isOnly(subject, typename) {
    return is(subject[typename]) && allOf(subject).length === 1;
  };

  var some = function some(subject) {
    for (var _len = arguments.length, typenames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      typenames[_key - 1] = arguments[_key];
    }

    return typenames.some(function (typename) {
      return is(subject, typename);
    });
  };

  var every = function every(subject) {
    for (var _len2 = arguments.length, typenames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      typenames[_key2 - 1] = arguments[_key2];
    }

    return typenames.every(function (typename) {
      return is(subject, typename);
    });
  };

  var of = function of(subject) {
    return keys.find(function (key) {
      return is(subject, key);
    });
  };

  var allOf = function allOf(subject) {
    return keys.filter(function (key) {
      return is(subject, key);
    });
  };

  var types = function types() {
    return keys.slice();
  };

  return { is: is, isOnly: isOnly, some: some, every: every, of: of, allOf: allOf, types: types };
};

module.exports = mtype;