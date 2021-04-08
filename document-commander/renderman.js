import { render as original_render } from "nunjucks";


function render(template_name, context) {
    return original_render(template_name, context);
}


export { render };