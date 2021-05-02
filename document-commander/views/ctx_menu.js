import { View } from "../lib/view";
import { render as original_render } from "../renderman";

import { CtxMenu } from "../models/ctx_menu";

import {
    EV_ACTION_CLICKED,
} from "../events";



const DEFAULT_TEMPLATE_NAME = "templates/ctx_menu.html";


class CtxMenuView extends View {

    get template_name() {
        return this.options['template_name'] || DEFAULT_TEMPLATE_NAME;;
    }

    constructor({
        model=new CtxMenu(),
        options={}
    }) {
        super(options);
        this.model = model;
        this.options = options;
        this.el = options['el'];
    }

    events() {
        // DOM events
        let event_map = {
            "click li.dropdown-item > a": "on_item_clicked",
        }
        return event_map;
    }

    on_item_clicked(event) {
        let target = event.currentTarget,
        item_id,
        parent,
        item;

        event.preventDefault();
        // target is <a> element
        // target.parentNode is <li> element
        parent = target.parentNode
        if (!parent) {
            console.error("CtxMenu unable to retrieve id of clicked element.");
            return;
        }
        item_id = parent.id;

        if (!this.model) {
            return;
        }

        item = this.model.items.get({id: item_id});

        if (!item) {
            console.error("Context menu item not found.");
            return;
        }

        // If user clicked root folder, node will be `undefined`.
        // Root breadcrumb item does not have dataset id attribute set.
        this.trigger(EV_ACTION_CLICKED, item);
    }

    render_to_string() {

        let html, context = {};

        context['items'] = this.model.items;
        html = original_render(
            this.template_name,
            context
        )

        return html;
    }

    render() {
        let html = this.render_to_string();

        this.el.innerHTML = html;

        return html;
    }
};

export { CtxMenuView };