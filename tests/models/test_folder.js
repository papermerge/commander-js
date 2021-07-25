import { assert } from "chai";

import { Folder } from '../../document-commander/models/folder';


describe("Folder model test suite", () => {

    it("Can instanciate Folder model", () => {
        let folder = new Folder({id: 1, title: "My Documents"});

        assert.isDefined(folder);
        assert.equal(folder.title, "My Documents")
        assert.isTrue(folder.is_folder);
        assert.isFalse(folder.is_document);
    });

    it("Can compare distinct Folder instances", () => {
        let folder1,
            folder2,
            folder3;

        folder1 = new Folder({id: 1, title: "My Documents"});
        folder2 = new Folder({id: 1, title: "My Documents"});
        folder3 = new Folder({id: 2, title: "X"});

        // different folder instances, contain
        // same id && title
        assert.isTrue(
            folder1.equal(folder2)
        );
        assert.isTrue(
            folder2.equal(folder1)
        );
        assert.isFalse(
            folder1.equal(folder3)
        );
    });

});
