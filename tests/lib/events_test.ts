import { assert } from "chai";

import { Events } from '../../document-commander/lib/events';


class SomeModel extends Events {
  counter: number = 0;
}

describe("Events test suite", () => {

  it("Can bind/trigger events on class which extends Events", () => {
    let some_model = new SomeModel();

    some_model.on('event', function() { this.counter += 1; });
    some_model.trigger('event');
    assert.equal(
      some_model.counter,
      1,
      'counter should be incremented.'
    );
    
  });

});
