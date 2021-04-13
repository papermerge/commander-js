import { assert } from "chai";

import { Collection } from '../../document-commander/lib/collection';


describe("Collection test suite", () => {

  it("Can instanciate a empty Collection", () => {

    let collection = new Collection<string>();

    assert.isDefined(collection);
  });

});
