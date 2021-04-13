import { View } from "./view";
import { render as original_render } from "../renderman";
import { Events } from "../events";
import { Breadcrumb } from "../models/breadcrumb";


class BreadcrumbView extends View {

    breadcrumb: Breadcrumb;
    template_name!: string;
    options: any;
    $el: JQuery<HTMLElement>;

    constructor(breadcrumb: Breadcrumb, options?: any ) {
        this.breadcrumb = breadcrumb;
        this.options = options;
        this.$el = options['el'];
    }

    render_to_string() {

        let html_breadcrumb, context: any = {};

        context['nodes'] = this.breadcrumb.nodes;
        html_breadcrumb = original_render(
            this.template_name,
            context
        )

        return html_breadcrumb;
    }

    render(): string {
        let breadcrumb_html = this.render_to_string();

        this.$el.html(breadcrumb_html);

        return breadcrumb_html; 
    }
};

export { BreadcrumbView };