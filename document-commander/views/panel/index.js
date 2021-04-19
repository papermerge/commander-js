import { PanelBaseView } from "./base";

const DEFAULT_TEMPLATE_NAME = "templates/panel/grid.html";

class PanelView extends PanelBaseView {
    
    constructor({
        model,
        options={}
    }) {
        super({model, options});
        this.template_name = options['template_name'] || DEFAULT_TEMPLATE_NAME;
    }

};


export { PanelView };