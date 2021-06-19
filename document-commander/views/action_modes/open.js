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

    events() {
        let event_map = {
            'click': 'onclick'
        };

        return event_map;
    }

    onclick(event) {
        if (this.mode == OpenModeView.INLINE) {
            this.mode = OpenModeView.OTHER_PANEL;
        } else {
            this.mode = OpenModeView.INLINE;
        }
    }

    set mode(value) {
        this._mode = value;
        this.trigger("change");
    }

    get mode() {
        return this._mode;
    }

    get is_inline() {
        return this._mode == OpenModeView.INLINE;
    }

    get is_other_panel() {
        return this._mode == OpenModeView.OTHER_PANEL;
    }

    get default_template_name() {
        return "templates/action_modes/open.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {
            'is_inline': this.is_inline,
            'is_other_panel': this.is_other_panel
        }
    }
}

OpenModeView.INLINE = 'inline';
OpenModeView.OTHER_PANEL = 'other_panel';

export { OpenModeView };
