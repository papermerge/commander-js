import { assert } from "chai";

import { nodes_count } from '../document-commander/utils';
import { Folder, Document } from '../document-commander/models/index';


describe("Utils test suite", () => {

    it("nodes_count one folder passed as node", () => {

        let selection = [];
        let node = new Folder({id: 1, title: "My Invoices"});

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

    it("nodes_count one doc passed as node", () => {

        let selection = [];
        let node = new Document({id: 1, title: "Some.pdf"});

        const {folder_count, doc_count} = nodes_count({
            node, selection
        });

        assert.equal(
            folder_count,
            0,
            "Folder selected :("
        );
        assert.equal(
            doc_count,
            1,
            "!= 1 Docs were selected :("
        );
    }); // it

    it("nodes_count several docs and folders passed as selection", () => {

        let selection = [
            new Document({id: 2, title: "2.pdf"}),
            new Document({id: 3, title: "3.pdf"}),
            new Folder({id: 4, title: "IamFolder"}),
        ];
        let node = new Document({id: 1, title: "Some.pdf"});

        const {folder_count, doc_count} = nodes_count({
            node, selection
        });

        assert.equal(
            folder_count,
            1,
            "Folder count is not correct :("
        );
        assert.equal(
            doc_count,
            3,
            "Document count is not correct :("
        );
    }); // it

    it("nodes_count does not count duplicate nodes", () => {

        let selection = [
            new Document({id: 2, title: "2.pdf"}),
            new Document({id: 3, title: "3.pdf"}),
            new Folder({id: 4, title: "IamFolder"}),
        ];
        // node is a duplicate already found in selection
        let node = new Document({id: 3, title: "3.pdf"});

        const {folder_count, doc_count} = nodes_count({
            node, selection
        });

        assert.equal(
            folder_count,
            1,
            "Folder count is not correct :("
        );
        assert.equal(
            doc_count,
            2,
            "Document count is not correct. Mind the duplicates!"
        );
    }); // it
}); // describe