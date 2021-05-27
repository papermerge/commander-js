import { assert } from "chai";

import { Collection } from "@papermerge/symposium";

import { CommanderView } from "../../document-commander/views/commander";


describe("CommanderView test suite", () => {

  it("Can instanciate CommanderView only with options", () => {

    let commander_view = new CommanderView({
        options:{
            'panel': {'el': document.querySelector('#panel')},
            'breadcrumb': {'el': document.querySelector("#breadcrumb")}
        }
    });

    assert.isDefined(commander_view);
  });

  it("Can instanciate CommanderView with empty parameter list", () => {

    let commander_view = new CommanderView();

    assert.isDefined(commander_view);
  });

});
