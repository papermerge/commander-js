import { assert } from "chai";

import { Document } from '../../document-commander/models/document';


describe("Document model test suite", () => {

  it("Can instanciate Document", () => {

    let document = new Document({id: 1, title: "invoice.pdf"});

    assert.isDefined(document);
    assert.equal(document.title, "invoice.pdf");
    assert.isTrue(document.is_document());
    assert.isFalse(document.is_folder());
  });

});
