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

  it("sets by default ocr_status to Document.UNKNOWN", () => {

    let doc = new Document({id: 1, title: "invoice.pdf"});

    assert.isDefined(doc);
    assert.equal(
      doc.ocr_status,
      Document.UNKNOWN,
      `Initial status is not set to ${Document.UNKNOWN}`
    );
  });

});
