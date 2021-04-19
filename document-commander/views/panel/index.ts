import { Panel } from "../../models";
import { PanelBaseView } from "./base";

const DEFAULT_TEMPLATE_NAME = "templates/panel/grid.html";

class PanelView extends PanelBaseView {
    
    template_name: string = DEFAULT_TEMPLATE_NAME;
    
    constructor(
        {model, options}: {
            model: Panel,
            options?: Record<string, any> 
        }
    ) {
        super({model, options});
        this.template_name = options['template_name'] || DEFAULT_TEMPLATE_NAME;
    }

};


export { PanelView };