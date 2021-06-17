import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class DisplayModeView extends View {
    /**
    Dropdown element with different ways to display documents and folders.

    There are at least two ways to display documents and folders:

        * as detailed list view
        * as thumbnails

    Thus, passed collection contains at least two items.
    */

    constructor({collection, options}) {
        super(options);
        this.collection = collection;
    }

    get default_template_name() {
        return "templates/action_modes/display.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {'items': this.collection};
    }
}

export { DisplayModeView };
