import { View } from "../lib/view";
import { render as original_render } from "../renderman";


class BreadcrumbView extends View {

    constructor({
        breadcrumb,
        options
    }) {
        super(options);
        this.breadcrumb = breadcrumb;
        this.options = options;
        this.$el = options['el'];
    }

    render_to_string() {

        let html_breadcrumb, context = {};

        context['nodes'] = this.breadcrumb.nodes;
        html_breadcrumb = original_render(
            this.template_name,
            context
        )

        return html_breadcrumb;
    }

    render() {
        let breadcrumb_html = this.render_to_string();

        this.$el.html(breadcrumb_html);

        return breadcrumb_html; 
    }
};

export { BreadcrumbView };