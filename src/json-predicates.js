'use strict'

const jsonPredicates = {
  number: subject => typeof subject === 'number' && isFinite( subject ),
  string: subject => typeof subject === 'string',
  boolean: subject => typeof subject === 'boolean',
  array: subject => Array.isArray( subject ),
  null: subject => subject === null,
  object: subject => typeof subject === 'object' && !jsonPredicates.null( subject ) && !jsonPredicates.array( subject )
}

module.exports = jsonPredicates
