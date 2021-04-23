import { Collection } from "../lib/collection";
import { View } from "../lib/view";
import { render as original_render } from "../renderman";
import { root_url } from "../urls";


const DEFAULT_TEMPLATE_NAME = "templates/breadcrumb.html";


class BreadcrumbView extends View {

    get template_name() {
        return this.options['template_name'] || DEFAULT_TEMPLATE_NAME;;
    }

    constructor({
        breadcrumb=new Collection(),
        options={}
    }) {
        super(options);
        this.breadcrumb = breadcrumb;
        this.options = options;
        this.el = options['el'];
    }

    render_to_string() {

        let html_breadcrumb, context = {};

        context['nodes'] = this.breadcrumb.nodes;
        context['root_url'] = root_url();
        html_breadcrumb = original_render(
            this.template_name,
            context
        )

        return html_breadcrumb;
    }

    render() {
        let breadcrumb_html = this.render_to_string();

        this.el.innerHTML = breadcrumb_html;

        return breadcrumb_html; 
    }
};

export { BreadcrumbView };