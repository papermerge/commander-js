import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class UploadButtonView extends View {
    /*
    * Very simple view to render upload button.
    */
    get default_template_name() {
        return "templates/action_buttons/upload.html";
    }

    get default_template_engine() {
        return renderman;
    }
}

export { UploadButtonView };
