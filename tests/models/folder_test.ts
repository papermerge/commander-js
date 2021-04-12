import { assert } from "chai";

import { Folder } from '../../document-commander/models/folder';


describe("Folder model test suite", () => {

  it("Can instanciate Folder model", () => {

    let folder = new Folder("My Documents");

    assert.isDefined(folder);
    assert.equal(folder.title, "My Documents")
    assert.isTrue(folder.is_folder());
    assert.isFalse(folder.is_document());
  });

});
