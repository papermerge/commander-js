import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class PanelModeView extends View {
    /*
    Panel mode toggles between single mode and dual mode.

    This view is a single button in two states:

        * single
        * dual

    When only one panel is active (i.e. the view is now in single mode)
    this view will render as a button with "dual-panel" icon - thus
    suggesting to user that when clicked it will go into dual mode.

    When two panels are active (i.e. the view is in dual mode)
    current/this view will render as a button with a cross (i.e. "close me" icon)
    thus implying to user that when clicked current panel will close leving
    user with only one panel open (single panel mode).
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
        if (this.mode == PanelModeView.SINGLE) {
            this.mode = PanelModeView.DUAL;
            this.trigger('switch-2-dual');
        } else {
            this.mode = PanelModeView.SINGLE;
            this.trigger('switch-2-single');
        }
    }

    set mode(value) {
        this._mode = value;
        this.trigger("change");
    }

    get mode() {
        return this._mode;
    }

    get is_single() {
        return this._mode == PanelModeView.SINGLE;
    }

    get is_dual() {
        return this._mode == PanelModeView.DUAL;
    }

    get default_template_name() {
        return "templates/action_modes/panel.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {
            'is_single': this.is_single,
            'is_dual': this.is_dual
        }
    }
}

PanelModeView.SINGLE = 'single';
PanelModeView.DUAL = 'dual';

export { PanelModeView };
