import { TemplateNotFound, ValueError } from "../exceptions";

import document_template from "./document.html";
import folder_template from "./folder.html";

// maps template_name to the actual template content
let templates_map = {
    'document.html': document_template,
    'folder.html': folder_template,
}

function get_template(template_name: string) {
    let template = undefined, new_template_name: string;

    if (!template_name) {
        throw new ValueError("Empty argument");
    }

    // user asks for template with prefix e.g. "templates/document.html"
    if (template_name.startsWith('templates/')) {
        // strip prefix
        new_template_name = template_name.replace(/^templates\//, '')
        template = templates_map[new_template_name];
    } else { // user asks for template without prefix e.g. "document.html"
        template = templates_map[template_name];
    }

    if (!template) {
        throw new TemplateNotFound(
            `Template ${template_name} not found`
        );
    }

    return template;
}


export { get_template };


