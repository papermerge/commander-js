import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class NewFolderButtonView extends View {
    /*
    * Very simple view just to render a single (new folder) button.
    */
    get default_template_name() {
        return "templates/action_buttons/new_folder.html";
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

export { NewFolderButtonView };
