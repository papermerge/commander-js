import { renderString } from "nunjucks";

import { get_template } from "./templates/index";


function render(template_name: string, context: any) {
    
    return renderString(
        get_template(template_name), context
    );
}


export { render };