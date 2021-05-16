import { PanelBaseView } from "./base";

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

};


export { PanelView };