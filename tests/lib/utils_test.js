import { assert } from "chai";

import { isFunction } from '../../document-commander/lib/utils';


describe("test/lib/utils_test.js", () => {

  it("tests isFunction", () => {

    let func = function(){},
        some_obj = {};

    assert.isTrue(
        isFunction(func)
    );
    assert.isFalse(
        isFunction(some_obj)
    );
  });

});