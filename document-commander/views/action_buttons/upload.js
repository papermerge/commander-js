import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class UploadButtonView extends View {
    /*
    * Very simple view to render upload button.
    */
    constructor({options}) {
        super(options);
    }

    get default_template_name() {
        return "templates/action_buttons/upload.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {
            'has_perm': true
        }
    }
}

export { UploadButtonView };
