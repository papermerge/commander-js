import { assert } from "chai";

import { Events } from '../../document-commander/lib/events';
import { mix_them } from "../../document-commander/lib/utils";


class SomeModel extends Events {
    some_attr: int = 0;
}

describe("Events test suite", () => {

  it("Bind and trigger events multiple times", () => {
    let obj = {counter: 0};
    
    obj = mix_them(obj, new Events());

    obj.on('event', function() { obj.counter += 1; });
    obj.trigger('event');
    assert.equal(
        obj.counter,
        1,
        'counter should be incremented.'
    );
    
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    
    assert.equal(
        obj.counter,
        5,
        'counter should be incremented five times.'
    );
  });

  it("Can bind/trigger events on class which extends Events", () => {
    let some_model = new SomeModel();

    some_model.on('event', function() { this.some_attr += 1; });
    some_model.trigger('event');
    assert.equal(
        some_model.some_attr,
        1,
        'counter should be incremented.'
    );
    
  });

});
