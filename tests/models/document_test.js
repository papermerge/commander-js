import { assert } from "chai";

import { Document } from '../../document-commander/models/document';


describe("Document model test suite", () => {

  it("Can instanciate Document", () => {

    let doc = new Document({id: 1, title: "invoice.pdf"});

    assert.isDefined(doc);
    assert.equal(doc.title, "invoice.pdf");
    assert.isTrue(doc.is_document);
    assert.isFalse(doc.is_folder);
  });

});
