import { assert } from "chai";

import { Collection } from "../../document-commander/lib/collection";

import { CommanderPanelView } from "../../document-commander/views/commander_panel";


describe("CommanderPanelView test suite", () => {

  it("Can instanciate CommanderPanelView only with options", () => {

    let panel_view = new CommanderPanelView({
        options:{
            'panel': {'el': document.querySelector('#panel')},
            'breadcrumb': {'el': document.querySelector("#breadcrumb")}
        }
    });

    assert.isDefined(panel_view);
  });

  it("Can instanciate CommanderPanelView with empty parameter list", () => {

    let panel_view = new CommanderPanelView();

    assert.isDefined(panel_view);
  });

});
