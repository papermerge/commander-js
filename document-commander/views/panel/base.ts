import { View } from "../view";
import { render as original_render } from "../../renderman";
import { Panel } from "../../models/index";


class PanelBaseView extends View {

    panel: Panel;
    options: any;
    template_name!: string;
    $el: JQuery<HTMLElement>

    constructor(panel: Panel, options: any) {
        super();
        this.panel = panel;
        this.options = options;
        this.$el = options['el'];
    }

    events() {
        let event_map = {
            "click .node": "on_node_clicked",
        };

        return event_map;
    }

    on_node_clicked(node) {
        console.log("click");
        this.panel.change_parent(node);
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
