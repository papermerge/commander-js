import { assert } from "chai";
import { Collection } from "../../document-commander/lib/collection";
import { PanelView } from "../../document-commander/views/panel/index";
import { Panel } from "../../document-commander/models/panel";
import {
    Document,
    Folder,
} from "../../document-commander/models/index";


describe("tests/views/panel_view_test.js", () => {

  it("Will render nodes", () => {

    let panel,
    panel_list_view,
    panel_list_html,
    nodes;

    nodes = new Collection();
    
    nodes.add([
        new Document({id: 1, title: 'invoice1.pdf'}),
        new Document({id: 2, title: 'invoice2.pdf'}),
        new Folder({id: 3, title: 'My Document'})
    ]);
    panel = new Panel(nodes);
    panel_list_view = new PanelView({model: panel});
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
