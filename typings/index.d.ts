// Typescript type definitions for mtype 0.1.x
// Project: https://github.com/mojule/mtype
// Note: For vscode intellisense to work when developing d.ts files include jsconfig.json in project root.
// vscode intellisense unreliable in interpreting jsdoc @tags.  Abandoned @tags for simple text.


declare namespace mtype {

  /**
   *Applies test to subject and Returns: boolean result.
   */
  export interface typePredicate {
    (subject: any): boolean
  }

  /**
   *Key/Predicate function  pairs where keys are typeNames and predicate functions test whether subject is of that typeName.
   */
  export interface typePredicates {
    [typeName: string]: typePredicate
  }



  /**
   *mtype factory function Returns: instance of api.  Api functions apply typePredicates against passed subject values.
   */
  export interface api {
    /**
     *Subject passes predicate test for typeName.
     *Param: subject Value to test against typeName predicate.
     *Param: typeName Name of predicate test to apply to subject.
     *Returns: true if subject passes predicate test for typeName.
     */
    is: (subject: any, typeName: string) => boolean

    /**
     *Subject passes predicate test for typeName only. (Does NOT pass any other predicate tests).
     *Param: subject Value to test against typeName predicate.
     *Param: typeName Name of predicate test to apply to subject.
     *Returns: true if subject passes predicate test for typeName and NO other predicate tests.
     */
    isOnly: (subject: any, typeName: string) => boolean

    /**
     *Subject passes predicate test for a least one of the typeNames.
     *Param: subject Value to test against typeName predicates.
     *Param: typeNames Array of names of the predicate tests to apply to subject.
     *Returns: true if subject passes predicate test for at least one of typeNames.
     */
    some: (subject: any, ...typeNames: string[]) => boolean

    /**
     *Subject passes predicate tests for all the typeNames.
     *Param: subject Value to test against typeName predicates.
     *Param: typeNames Array of names of the predicate tests to apply to subject.
     *Returns: true if subject passes predicate test for all typeNames.
     */
    every: (subject: any, ...typeNames: string[]) => boolean

    /**
     *Subject is tested against predicates.
     *Param: subject Value to test against typeName predicates.
     *Returns: typeName of the first predicate test passed else undefined.
     */
    of: (subject: any) => string

    /**
     *Subject is tested against predicates.
     *Returns: typeNames of all predicate tests passed else [].
     */
    allOf: (subject: any) => string[]


    /**
     *Get predicate typeNames.
     *Returns: all predicate typeNames.
     */
    types: string[]
  }


  /**
   *Factory function generating an instance of mtype.
   *Param: predicates Key/predicate pairs.
   *Returns: instance of mtype.api.
   */
  export function create(predicates: typePredicates): api
}


export = mtype.create
