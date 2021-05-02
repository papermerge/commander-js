import { assert } from "chai";

import { get_template } from '../document-commander/templates/index';
import { TemplateNotFound } from '../document-commander/exceptions';


describe("Templates API test suite", () => {

  it("can retrieve basic templates with get_template", () => {
    assert.isDefined(
        get_template("panel/grid.html")
    );
    assert.isDefined(
        get_template("panel/list.html")
    );
    assert.isDefined(
        get_template("breadcrumb.html")
    );
    assert.isDefined(
        get_template("ctx_menu.html")
    );
  });

  it("throws TemplateNotFound when template is not there", () => {
    assert.throws(
        () => { get_template("blah.html")},
        TemplateNotFound,
        /not found/
    );
  });

});
