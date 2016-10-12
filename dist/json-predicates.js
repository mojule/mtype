'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var jsonPredicates = {
  number: function number(subject) {
    return typeof subject === 'number' && isFinite(subject);
  },
  string: function string(subject) {
    return typeof subject === 'string';
  },
  boolean: function boolean(subject) {
    return typeof subject === 'boolean';
  },
  array: function array(subject) {
    return Array.isArray(subject);
  },
  null: function _null(subject) {
    return subject === null;
  },
  object: function object(subject) {
    return (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && !jsonPredicates.null(subject) && !jsonPredicates.array(subject);
  }
};

module.exports = jsonPredicates;