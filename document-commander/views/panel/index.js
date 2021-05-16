import { PanelBaseView } from "symposium";
import { renderman } from "../../renderman";

const DEFAULT_TEMPLATE_NAME = "templates/panel/grid.html";

class PanelView extends PanelBaseView {

    get template_name() {
        return  this.options['template_name'] || DEFAULT_TEMPLATE_NAME;
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
        html_panel = renderman.render(
            this.template_name,
            context
        );

        return html_panel;
    }

};


export { PanelView };