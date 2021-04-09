import { renderString } from "nunjucks";
import document_template from "./templates/document.html";
import folder_template from "./templates/folder.html";


function render(template_name, context) {
    if (template_name == "document.html") {
        return renderString(document_template, context);
    }

    return renderString(folder_template, context);
}


export { render };