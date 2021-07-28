import { assert } from "chai";

import { nodes_count } from '../document-commander/utils';
import { Folder, Document } from '../document-commander/models/index';


describe("Utils test suite", () => {

    it("notes_count one folder passed as node", () => {

        let selection = [];
        let node = new Folder({id: 1, title: "Some.pdf"});

        const {folder_count, doc_count} = nodes_count({
            node, selection
        });

        assert.equal(
            folder_count,
            1,
            "No folder was selected :("
        );

        assert.equal(
            doc_count,
            0,
            "Docs were selected as well :("
        );
  }); // it
}); // describe