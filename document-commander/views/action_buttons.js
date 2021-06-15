import { View } from "@papermerge/symposium";p
import { renderman } from "../renderman";

class ActionButtonsView extends View {

    constructor({collection, options}) {
        super(options);
        this.collection = collection;
    }

    get default_template_name() {
        return "templates/action_buttons.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {'items': this.collection};
    }
}

export { ActionButtonsView };
