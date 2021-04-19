import { assert } from "chai";

import { Model } from '../../document-commander/lib/model';


class SomeModel extends Model {
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

    some_model.trigger('event');
    some_model.trigger('event');
    assert.equal(
      some_model.counter,
      3,
      'counter should be incremented.'
    );
  });

});
