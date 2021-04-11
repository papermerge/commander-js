import { assert } from "chai";

import { Document } from '../../document-commander/models/document';


describe("Document model test suite", () => {

  it("Can instanciate Document", () => {

    let document = new Document("invoice.pdf");

    assert.isDefined(document);
    assert.equal(document.title, "invoice.pdf")
  });

});
