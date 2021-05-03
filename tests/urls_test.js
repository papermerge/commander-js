import { assert } from "chai";

import { urlconf } from '../document-commander/urls';
import { Folder, Document } from '../document-commander/models/index';


describe("UrlConf API test suite", () => {


  it("can set custom urlconf prefix", () => {
    urlconf.prefix = "/prefix-for-test"

    assert.equal(
        urlconf.prefix,
        urlconf.root_url()
    );
  }); // it


  it("can use folder_url", () => {
    let folder;

    urlconf.prefix = "/prefix-for-test"

    assert.equal(
        urlconf.folder_url(),
        "/prefix-for-test/folder/"
    );

    folder = new Folder({id: 101, title: "My Documents"});

    assert.equal(
        urlconf.folder_url(folder),
        "/prefix-for-test/folder/101"
    );

    assert.equal(
        urlconf.folder_url("104"),
        "/prefix-for-test/folder/104",
        "folder_url failed with string input"
    );

    assert.equal(
        urlconf.folder_url(102),
        "/prefix-for-test/folder/102",
        "folder_url failed with integer input"
    );
  }); // it


  it("can use document_url", () => {
    let doc;

    urlconf.prefix = "/prefix-for-test"

    doc = new Document({id: 101, title: "invoice.pdf"});

    assert.equal(
        urlconf.document_url(doc),
        "/prefix-for-test/document/101"
    );

    assert.equal(
        urlconf.document_url(104),
        "/prefix-for-test/document/104",
        "document_url failed with integer input"
    );

    assert.equal(
        urlconf.document_url("102"),
        "/prefix-for-test/document/102",
        "document_url failed with string input"
    );
  }); // it
}); // describe
