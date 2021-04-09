import { renderString } from "nunjucks";

import { get_template } from "./templates/index.js";


function render(template_name, context) {
    
    return renderString(
        get_template(template_name), context
    );
}


export { render };