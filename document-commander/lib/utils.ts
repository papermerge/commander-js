/**
 * Method for mixing mixings.
 * Code grabbed from Typescript handbook:
 * https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
 * 
 * Example of usage:
 * 
  class Eventful {
    on() {}
    off() {}
    trigger() {}
  }

  // Including the base
  class Model {
    x = 0;
    y = 0;
  }

  // Then you create an interface which merges
  // the expected mixins with the same name as your base
  interface Model extends Eventful {};

  // Apply the mixins into the base class via the JS at runtime
  applyMixins(Model, [Eventful]);
*
*/
function applyMixins(derivedCtor: any, constructors: any[]) {

    constructors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
            Object.create(null)
        );
      });
    });
}

export { applyMixins };