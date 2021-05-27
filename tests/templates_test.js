import { assert } from "chai";

import { renderman } from '../document-commander/renderman';
import { exceptions } from '@papermerge/symposium';


describe("Templates API test suite", () => {

  it("can retrieve basic templates with get_template", () => {
    assert.isDefined(
        renderman.get_template("panel/grid.html")
    );
    assert.isDefined(
        renderman.get_template("panel/list.html")
    );
    assert.isDefined(
        renderman.get_template("breadcrumb.html")
    );
    assert.isDefined(
        renderman.get_template("ctx_menu.html")
    );
  });

  it("throws TemplateNotFound when template is not there", () => {
    assert.throws(
        () => { renderman.get_template("blah.html"); },
        exceptions.TemplateNotFound,
        /not found/
    );
  });

  it("throws ValueError when get_template is invoked with empty arguments", () => {
    assert.throws(
        () => { renderman.get_template(); },
        exceptions.ValueError,
        /empty/i
    );
  });

});
