import { render as original_render } from "../../renderman";
import { Panel } from "../../models/index";


class PanelBaseView {

    panel: Panel;
    options: any;
    template_name!: string;
    $el: JQuery<HTMLElement>

    constructor(panel: Panel, options: any) {
        this.panel = panel;
        this.options = options;
        this.$el = options['el'];
    }

    render_to_string() {

        let html_panel, context: any = {};

        context['nodes'] = this.panel.nodes;
        html_panel = original_render(
            this.template_name,
            context
        )

        return html_panel;
    }

    render(): string {
        let panel_html = this.render_to_string();

        this.$el.html(panel_html);

        return panel_html; 
    }
};


export { PanelBaseView };
