import { PanelBaseView } from "@papermerge/symposium";
import { renderman } from "../../renderman";


class PanelView extends PanelBaseView {

    get default_template_name() {
        return "templates/panel/grid.html";
    }

    get default_template_engine() {
        return renderman;
    }

    constructor({
        collection,
        options={}
    }) {
        super({collection, options});
    }

    render_to_string() {

        let html_panel = "",
            context = {};

        if (!this.collection) {
            return html_panel;
        }
        context['objects'] = this.collection;
        html_panel = this.template_engine.render(
            this.template_name,
            context
        );

        return html_panel;
    }
};


export { PanelView };