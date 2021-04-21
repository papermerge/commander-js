import { assert } from "chai";

import { Document, Folder } from "../../document-commander/models/index";
import { Collection } from '../../document-commander/lib/collection';


describe("test/lib/collection_test.js", () => {

  it("Can instanciate a empty Collection", () => {

    let col = new Collection();

    assert.isDefined(col);
  });

  it("Can add items to the collection", () => {
    let col = new Collection();

    col.add(new Document({id: 1, title: "invoice.pdf"}));
    col.add(new Folder({id: 2, title: "My Documents"}));

    assert.equal(col.length, 2);
  });

  it("Can add an array to the collection", () => {
    let col = new Collection(), arr = [];

    arr.push(new Document({id: 1, title: "invoice.pdf"}));
    arr.push(new Folder({id: 2, title: "My Documents"}));

    col.add(arr);

    assert.equal(col.length, 2);
    assert.equal(col[0].title, "invoice.pdf");
  });

  it("Can get item by attributes", () => {
    let col = new Collection(),
      arr = [],
      doc1,
      doc2;

    arr.push(
      new Document({id:1, title:"doc1.pdf"})
    );
    arr.push(
      new Document({id:2, title:"doc2.pdf"})
    );

    col.add(arr);
    // get by id
    doc1 = col.get({id: 1});

    assert.isDefined(doc1);
    assert.equal(doc1.id, 1);

    // get by title
    doc2 = col.get({title: "doc2.pdf"});
    
    assert.isDefined(doc2);
    assert.equal(doc2.id, 2);
  });

  it("Compares attributes as strings", () => {
    // .get method compares attrbitutes as strings
    // i.e. col.get({id: 1}) is same as col.get({id: "1"})
    let col = new Collection(),
    arr = [],
    doc1,
    doc2;

    arr.push(
      new Document({id:1, title:"doc1.pdf"})
    );
    arr.push(
      new Document({id:2, title:"doc2.pdf"})
    );

    col.add(arr);
    // get by id
    doc1 = col.get({id: 1});

    assert.isDefined(doc1);
    assert.equal(doc1.id, 1);

    // get by id, but id is passed as string, not as integer
    doc2 = col.get({id: "1"});
    
    assert.isDefined(doc2);
    assert.equal(doc2.id, 1);
  });

  it("Ignores undefined attributes", () => {
    // .get method will ignore attrbitutes with undefined value
    // i.e. col.get({id: 1}) is same as col.get({id: 1, title: undefined})
    let col = new Collection(),
    arr = [],
    doc1,
    doc2;

    arr.push(
      new Document({id:1, title:"doc1.pdf"})
    );
    arr.push(
      new Document({id:2, title:"doc2.pdf"})
    );

    col.add(arr);
    // get by id
    doc1 = col.get({id: 1});

    assert.equal(doc1.id, 1);

    // get by id, but id is passed as string, not as integer
    doc2 = col.get({id: 1, title: undefined});
    
    assert.isDefined(doc2, "doc2 was not found");
    assert.equal(doc2.id, 1);
  });

});
