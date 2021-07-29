import { assert } from "chai";

import { nodes_count } from '../document-commander/utils';
import { Folder, Document } from '../document-commander/models/index';


describe("Utils test suite", () => {

    it("nodes_count several docs and folders passed as selection", () => {

        let selection = [
            new Document({id: 2, title: "2.pdf"}),
            new Document({id: 3, title: "3.pdf"}),
            new Folder({id: 4, title: "IamFolder"}),
        ];

        const {folder_count, doc_count} = nodes_count(selection);

        assert.equal(
            folder_count,
            1,
            "Folder count is not correct :("
        );
        assert.equal(
            doc_count,
            2,
            "Document count is not correct :("
        );
    }); // it

}); // describe