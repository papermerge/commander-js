import { assert } from "chai";
import $ from "jquery";

import { PanelListView } from "../../document-commander/views/panel/list";
import { Panel } from "../../document-commander/models/panel";
import {
    Document,
    Folder,
    NodesCollection
} from "../../document-commander/models/index";


describe("PanelListView test suite", () => {

  it("Will render nodes", () => {

    let panel,
    panel_list_view,
    panel_list_html,
    nodes;

    nodes = new NodesCollection();
    
    nodes.add([
        new Document('invoice1.pdf'),
        new Document('invoice2.pdf'),
        new Folder('My Document')
    ]);
    panel = new Panel({nodes: nodes});
    panel_list_view = new PanelListView({panel: panel});
    panel_list_html = panel_list_view.render();

    assert.isTrue(
        panel_list_html.indexOf("invoice1.pdf") > 0,
        `Rendered string ${panel_list_html} does not contain 'invoice1.pdf'`
    );
    assert.isTrue(
        panel_list_html.indexOf("invoice2.pdf") > 0,
        `Rendered string ${panel_list_html} does not contain 'invoice2.pdf'`
    );
    assert.isTrue(
        panel_list_html.indexOf("My Document") > 0,
        `Rendered string ${panel_list_html} does not contain 'My Document'`
    );
  });

});
