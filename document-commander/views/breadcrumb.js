import { View } from "symposium";
import { renderman } from "../renderman";
import { urlconf } from "../urls";

import { Breadcrumb } from "../models/breadcrumb";

import {
    EV_PANEL_ITEM_CLICK,
} from "symposium";


class BreadcrumbView extends View {

    get default_template_name() {
        return "templates/breadcrumb.html";
    }

    get default_template_engine() {
        return renderman;
    }

    constructor({
        collection=new Breadcrumb(),
        options={}
    }) {
        super(options);
        this.collection = collection;
        this.options = options;
        this.el = options['el'];
    }

    events() {
        // DOM events
        let event_map = {
            "click li.item > a": "on_item_clicked",
        }
        return event_map;
    }

    on_item_clicked(event) {
        let target = event.currentTarget,
        node_id,
        node;

        event.preventDefault();
        // vanilla js equivalent of $(...).data('id');
        node_id = target.dataset.id;

        if (!this.collection) {
            return;
        }

        node = this.collection.get({id: node_id});

        // If user clicked root folder, node will be `undefined`.
        // Root breadcrumb item does not have dataset id attribute set.
        this.trigger(EV_PANEL_ITEM_CLICK, node);
    }

    render_to_string() {

        let html_breadcrumb, context = {};

        context['nodes'] = this.collection;
        context['root_url'] = urlconf.root_url();
        html_breadcrumb = this.template_engine.render(
            this.template_name,
            context
        )

        return html_breadcrumb;
    }
};

export { BreadcrumbView };