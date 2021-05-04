import { assert } from "chai";
import { Collection } from "symposium";

import {
    Folder,
    Document,
    Panel,
} from "../../document-commander/models/index";



describe("tests/models/panel_test.js", () => {

  it("Can instanciate Panel model", () => {
    // Panel can be instanciated with emtpy parameter list
    let panel = new Panel();

    assert.isDefined(panel);
    // In such case panel has 0 nodes
    assert.equal(panel.nodes.length, 0);
  }); // it

  it("Can be instanciated with couple of nodes", () => {
    let panel, nodes;

    nodes = new Collection();

    nodes.push(new Document({id: 1, title: "invoice1.pdf"}));
    nodes.push(new Document({id: 2, title: "invoice2.pdf"}));
    nodes.push(new Folder({id: 3, title: "My Documents"}));

    panel = new Panel(nodes);

    assert.equal(
        panel.nodes.length, 3
    )
  }); // it

  it("can set_nodes_attr", () => {
    let panel, nodes;

    nodes = new Collection();

    nodes.push(new Document({id: 1, title: "invoice1.pdf"}));
    nodes.push(new Document({id: 2, title: "invoice2.pdf"}));
    nodes.push(new Folder({id: 3, title: "My Documents"}));

    panel = new Panel(nodes);

    // all panel nodes have attribute `visible` set by default to `true`
    assert.isTrue(
        panel.nodes.every((node) => { return node.visible; })
    );
    panel.set_nodes_attr('visible', false);
    // all panel nodes will have attribute `visible` set to `false`
    assert.isTrue(
        panel.nodes.every((node) => { return !node.visible; })
    );
  }); // it

  it("triggers change event when invoking set_nodes_attr", () => {
    let panel, nodes, count = 0;

    nodes = new Collection();

    nodes.push(new Document({id: 1, title: "invoice1.pdf"}));
    nodes.push(new Document({id: 2, title: "invoice2.pdf"}));
    nodes.push(new Folder({id: 3, title: "My Documents"}));

    panel = new Panel(nodes);

    panel.on('change', () => { count++; });
    panel.set_nodes_attr('visible', false);
    assert.equal(
        count,
        1,
        "Calling set_nodes_attr DID NOT trigger change event"
    );
  }); // it

}); // describe
