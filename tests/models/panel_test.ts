import { assert } from "chai";
import {
    Folder,
    Document,
    Panel,
    NodesCollection
} from "../../document-commander/models/index";



describe("Panel model test suite", () => {

  it("Can instanciate Panel model", () => {
    // Panel can be instanciated with emtpy parameter list
    let panel = new Panel();

    assert.isDefined(panel);
    // In such case panel has 0 nodes
    assert.equal(panel.nodes.length, 0);
  });

  it("Can be instanciated with couple of nodes", () => {
    let panel, nodes;

    nodes = new NodesCollection();

    nodes.push(new Document("invoice1.pdf"));
    nodes.push(new Document("invoice2.pdf"));
    nodes.push(new Folder("My Documents"));
    
    panel = new Panel(nodes);

    assert.equal(
        panel.nodes.length, 3
    )
  });

});
