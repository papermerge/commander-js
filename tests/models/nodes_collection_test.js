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
    col.add(new Document({id: 1, title: "invoice.pdf"}));
    col.add(new Folder({id: 1, title: "My Documents"}));

    assert.equal(col.length, 2);

    // check that change event was triggered twic
    assert.equal(
        calls_count, 2
    );

  });

  it("Trigger event before listening to it", () => {
    /**
     * This tests ensures that calling `trigger` (which
     * happens inside `add` method) before `on` will not end up in error.
     */
    let col = new NodesCollection();

    // note: there is no col.on("change", function() { ... });
    // should not generate errors
    col.add(new Document({id: 1, title: "invoice.pdf"}));  // invokes trigger("change")
    col.add(new Folder({id: 2, title: "My Documents"}));   // invokes trigger("change")

    assert.equal(col.length, 2);
  });

});
