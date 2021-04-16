import { assert } from "chai";

import { Document, Folder } from "../../document-commander/models/index";
import { NodesCollection } from '../../document-commander/models/index';


describe("Collection test suite", () => {

  it("Can instanciate a empty NodesCollection", () => {

    let col = new NodesCollection();

    assert.isDefined(col);
  });

  it("Will trigger change event when nodes are added to the collection", () => {
    let col = new NodesCollection(), calls_count = 0;

    col.on('change', function() { calls_count+=1; })
    col.add(new Document("invoice.pdf"));
    col.add(new Folder("My Documents"));

    assert.equal(col.length, 2);

    // check that change event was triggered twic
    assert.equal(
        calls_count, 2
    );

  });

});
