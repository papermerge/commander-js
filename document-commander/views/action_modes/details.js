import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class DetailsModeView extends View {
    /*
    Details mode toggles (i.e. opens/closes):

    Open/Close refers here to widgets panel (document details, tags, metadata etc)
    information is displayed
    */
    constructor({mode, options}) {
        super(options);
        this._mode = mode;
    }

    get default_template_name() {
        return "templates/action_modes/details.html";
    }

    get default_template_engine() {
        return renderman;
    }
}

DetailsModeView.SHOW = 'show';
DetailsModeView.HIDE = 'hide';

export { DetailsModeView };
