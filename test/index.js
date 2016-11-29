'use strict'

const assert = require( 'assert' )
const T = require( '../dist' )

describe( 'JSON types', () => {
  const t = T()

  describe( 'is', () => {
    it( 'number', () => {
      assert( t.is( 0, 'number' ) )

      assert( !t.is( NaN, 'number' ) )
      assert( !t.is( Infinity, 'number' ) )
      assert( !t.is( -Infinity, 'number' ) )
      assert( !t.is( '', 'number' ) )
      assert( !t.is( true, 'number' ) )
      assert( !t.is( [], 'number' ) )
      assert( !t.is( null, 'number' ) )
      assert( !t.is( {}, 'number' ) )
    })

    it( 'string', () => {
      assert( t.is( '', 'string' ) )

      assert( !t.is( 0, 'string' ) )
      assert( !t.is( true, 'string' ) )
      assert( !t.is( [], 'string' ) )
      assert( !t.is( null, 'string' ) )
      assert( !t.is( {}, 'string' ) )
    })

    it( 'boolean', () => {
      assert( t.is( true, 'boolean' ) )

      assert( !t.is( 0, 'boolean' ) )
      assert( !t.is( '', 'boolean' ) )
      assert( !t.is( [], 'boolean' ) )
      assert( !t.is( null, 'boolean' ) )
      assert( !t.is( {}, 'boolean' ) )
    })

    it( 'array', () => {
      assert( t.is( [], 'array' ) )

      assert( !t.is( 0, 'array' ) )
      assert( !t.is( '', 'array' ) )
      assert( !t.is( true, 'array' ) )
      assert( !t.is( null, 'array' ) )
      assert( !t.is( {}, 'array' ) )
    })

    it( 'null', () => {
      assert( t.is( null, 'null' ) )

      assert( !t.is( 0, 'null' ) )
      assert( !t.is( '', 'null' ) )
      assert( !t.is( true, 'null' ) )
      assert( !t.is( [], 'null' ) )
      assert( !t.is( {}, 'null' ) )
    })

    it( 'object', () => {
      assert( t.is( {}, 'object' ) )

      assert( !t.is( null, 'object' ) )
      assert( !t.is( [], 'object' ) )
      assert( !t.is( 0, 'object' ) )
      assert( !t.is( '', 'object' ) )
      assert( !t.is( true, 'object' ) )
    })
  })
})

describe( 'js types', () => {
  // less restrictive than JSON - JSON types have no ambiguity
  const jsPredicates = {
    number: subject => typeof subject === 'number',
    string: subject => typeof subject === 'string',
    boolean: subject => typeof subject === 'boolean',
    array: subject => Array.isArray( subject ),
    null: subject => subject === null,
    object: subject => typeof subject === 'object',
    undefined: subject => subject === undefined
  }

  const t = T( jsPredicates )

  describe( 'isOnly', () => {
    it( 'is one type and one type only', () => {
      assert( t.isOnly( {}, 'object' ) )
      assert( !t.isOnly( [], 'array' ) )
    })
  })

  describe( 'some', () => {
    it( 'has some of the types', () => {
      assert( t.some( {}, 'array', 'object' ) )
      assert( !t.some( '', 'array', 'object' ) )
    })
  })

  describe( 'every', () => {
    it( 'has all the types', () => {
      assert( t.every( [], 'array', 'object' ) )
      assert( !t.every( {}, 'array', 'object' ) )
    })
  })

  describe( 'of', () => {
    it( 'gets the first matching type', () => {
      assert.equal( t.of( [] ), 'array' )
      assert.notEqual( t.of( [] ), 'object' )
    })
  })

  describe( 'allOf', () => {
    it( 'gets all matching types', () => {
      assert.deepEqual( t.allOf( [] ), [ 'array', 'object' ] )
    })
  })

  describe( 'types', () => {
    it( 'has the right types', () => {
      assert.deepEqual( t.types(), [ 'number', 'string', 'boolean', 'array', 'null', 'object', 'undefined' ] )
    })
  })
})
