import { View } from "../../lib/view";
import { render as original_render } from "../../renderman";
import {
    Panel,
    Node,
    NodesCollection,
    NodesAction
} from "../../models/index";


class PanelBaseView extends View {

    panel: Panel;
    options: any;
    template_name!: string;
    $el: JQuery<HTMLElement>

    constructor(
        {panel, options}: {
            panel: Panel,
            options?: any
        }
    ) {
        super({options: options});
        this.panel = panel;
        this.options = options;
        if (options) {
            this.$el = options['el'];
        } else {
            this.$el = undefined;
        }
    }

    events() {
        let event_map = {
            "click .node": "on_node_clicked"
        }
        return event_map;
    }

    on_node_clicked(event: Event): void {
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

        if (this.$el) {
            this.$el.html(panel_html);
        }
        return panel_html; 
    }
};


export { PanelBaseView };
