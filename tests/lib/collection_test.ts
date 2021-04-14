import { assert } from "chai";

import { Node, Document, Folder } from "../../document-commander/models/index";
import { Collection } from '../../document-commander/lib/collection';


describe("Collection test suite", () => {

  it("Can instanciate a empty Collection", () => {

    let col = new Collection<Node>();

    assert.isDefined(col);
  });

  it("Can add items to the collection", () => {
    let col = new Collection<Node>();

    col.add(new Document("invoice.pdf"));
    col.add(new Folder("My Documents"));

    assert.equal(col.length, 2);
  });

  it("Can add an array to the collection", () => {
    let col = new Collection<Node>(), arr = [];

    arr.push(new Document("invoice.pdf"));
    arr.push(new Folder("My Documents"));

    col.add(arr);

    assert.equal(col.length, 2);
    assert.equal(col[0].title, "invoice.pdf");
  });

});
