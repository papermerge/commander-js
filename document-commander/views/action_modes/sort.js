import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class SortModeView extends View {
    /**
    Dropdown element with different ways to sort documents and folders.
    */

    constructor({collection, options}) {
        super(options);
        this.collection = collection;
    }

    get default_template_name() {
        return "templates/action_modes/sort.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {'items': this.collection};
    }
}

export { SortModeView };
