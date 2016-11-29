# mtype

A type checking facade that doesn't care how you check types - use duck typing,
use JSON schema, whatever.

I needed a consistent interface for type checking, sometimes I use duck typing,
sometimes I use JSON schema, regardless of which I tend to follow the same
general pattern, mtype codifies this.

## usage

```javascript
const T = require( 'mtype' )
const predicates = require( './pathToSomePredicateModule' )

// T(predicates:Object[Any=>Boolean])=>facade:Object[Function]
// create an instance of the type facade
const t = T( predicates )

// is(subject:Any,typename:String)=>matchesType:Boolean
// subject passes test for type?
console.log( t.is( subject, 'typename' ) )

// isOnly(subject:Any,typename:String)=>matchesType:Boolean
// subject passes test for type and doesn't pass any others
console.log( t.isOnly( subject, 'typename' ) )

// some(subject:Any,typenames:...String)=>matchesSome:Boolean
// subject matches at least one of the required types
console.log( t.some( subject, 'type1', 'type2', 'type3' ) )

// every(subject:Any,typenames:...String)=>matchesAll:Boolean
// subject matches all of the required types
console.log( t.every( subject, 'type1', 'type2', 'type3' ) )

// of(subject:Any)=>typename:String
// find best single type for subject
console.log( t.of( subject ) )

// allOf(subject:Any)=>typenames:[String]
// find all types that the subject passes
console.log( t.allOf( subject ) )
```

## what I usually use this for

Performing different actions depending on the type of something. Example using
DOM nodes:

```javascript
const predicates = {
  textNode: node => node.nodeType === 3,
  commentNode: node => node.nodeType === 8
  // etc
}

const toString = {
  textNode: node => node.nodeValue,
  commentNode: node => '<!--' + node.nodeValue + '-->'
  // etc
}

const t = T( predicates )

const nodeToString = node => {
  const typename = t.of( node )
  const stringifier = toString[ typename ]

  return stringifier( node )
}
```

## named predicates

Write some functions that return true if the passed arg is the named type. They
are checked in the order that the keys were declared in the named predicates
object, so order them from most to least specific. For example, in the following
example an array will pass both the `array` and `object` test, so `array` should
come first:

```javascript
const predicates = {
  array: subject => Array.isArray( subject ),
  object: subject => typeof subject === 'object'
}

const t = T( predicates )

console.log( t.of( [] ) ) // "array"
console.log( t.is( [], 'object' ) ) // true
console.log( t.allOf( [] ) ) // [ "array", "object" ]
```

## default types

If you instantiate without any predicates, it defaults to the types that I test
most often, which are JSON types:

```javascript
const t = T()

console.log( t.of( [] ) ) // "array"
```

Note that there are some differences between JSON types and JavaScript types,
for example in JavaScript an array is considered to be both an object and an
array, whereas in JSON it is *only* an array.

## license

MIT
