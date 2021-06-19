import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class OpenModeView extends View {
    /*
    Open mode toggles between opening the document:
        * inline/in current panel
        * in other panel

    When opening document in current view (i.e. inline mode)
    the document viewer will replace current commander. This is
    classical way of opening documents in papermerge.
    When opening document in other panel, current panel remains intact.
    */
    constructor({mode, options}) {
        super(options);
        this._mode = mode;
    }

    get default_template_name() {
        return "templates/action_modes/open.html";
    }

    get default_template_engine() {
        return renderman;
    }
}

OpenModeView.INLINE = 'inline';
OpenModeView.OTHER_PANEL = 'other_panel';

export { OpenModeView };
