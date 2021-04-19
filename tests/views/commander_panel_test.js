import { assert } from "chai";
import $ from "jquery";

import { CommanderPanelView } from "../../document-commander/views/commander_panel";


describe("CommanderPanelView test suite", () => {

  it("Can instanciate CommanderPanelView only with options", () => {

    let panel_view = new CommanderPanelView({
        options:{
            'panel': {'el': $('#panel')},
            'breadcrumb': {'el': $("#breadcrumb")}
        }
    });

    assert.isDefined(panel_view);
  });

  it("Can instanciate CommanderPanelView with empty parameter list", () => {

    let panel_view = new CommanderPanelView();

    assert.isDefined(panel_view);
  });

});
