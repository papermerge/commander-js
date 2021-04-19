import { View } from "../../lib/view";
import { render as original_render } from "../../renderman";
import {
    Panel,
    Node,
    NodesCollection,
    NodesAction
} from "../../models/index";


class PanelBaseView extends View {

    model: Panel;
    options: Record<string, any>;
    template_name!: string;
    $el: JQuery<HTMLElement>

    constructor(
        {model, options}: {
            model: Panel,
            options?: Record<string, any>
        }
    ) {
        super(options);
        this.model = model;
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
        let $target:JQuery<EventTarget> = $(event.currentTarget),
            node_id: string,
            node: Node;
        
        node_id = $target.data("id");
        console.log(`node ${node_id} clicked`);
        node = this.panel.get({id: node_id});
        if (node.is_document) {
            this.trigger("document_clicked", node);
        } else {
            this.trigger("folder_clicked", node);
        }
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
