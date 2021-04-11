import { render as original_render } from "../../renderman";
import { Panel } from "../../models/index";


class PanelBaseView {

    panel: Panel;
    template_name!: string;

    constructor(panel: Panel) {
        this.panel = panel;
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

        return panel_html; 
    }
};


export { PanelBaseView };
