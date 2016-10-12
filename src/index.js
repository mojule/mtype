'use strict'

const jsonPredicates = require( './json-predicates' )

const mtype = typePredicates => {
  typePredicates = typePredicates || jsonPredicates

  const keys = Object.keys( typePredicates )

  const is = ( subject, typename ) =>
    typePredicates[ typename ] && typePredicates[ typename ]( subject )

  const some = ( subject, ...typenames ) =>
    typenames.some( typename => is( subject, typename ) )

  const every = ( subject, ...typenames ) =>
    typenames.every( typename => is( subject, typename ) )

  const of = subject =>
    keys.find( key => is( subject, key ) )

  const allOf = subject =>
    keys.filter( key => is( subject, key ) )

  const types = () => keys.slice()

  return { is, some, every, of, allOf, types }
}

module.exports = mtype
