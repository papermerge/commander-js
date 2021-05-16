import { Collection, View } from "symposium";

import { PanelView } from "./panel/index";
import { BreadcrumbView } from "./breadcrumb";
import { CtxMenuView } from "./ctx_menu";
import { Breadcrumb } from "../models/breadcrumb";
import { CtxMenu } from "../models/ctx_menu";
import { fetch_children } from "../requests";
import { default_actions } from "../default_actions";

import {
    EV_PANEL_ITEM_CLICK,
    EV_PANEL_ITEM_SELECTED
} from "symposium";

import {
    EV_ACTION_CLICKED
} from "../events";


class CommanderPanelView extends View {

    constructor(options={}) {
        super();
        this.nodes_col = new Collection();
        this.panel_view = new PanelView({
            collection: this.nodes_col,
            options: options['panel']
        });
        this.breadcrumb_col = new Breadcrumb();
        this.breadcrumb_view = new BreadcrumbView({
            collection: this.breadcrumb_col,
            options: options['breadcrumb']
        });
        this.ctx_menu_model = new CtxMenu();
        this.ctx_menu_view = new CtxMenuView({
            model: this.ctx_menu_model,
            options: options['ctx_menu']
        });
        this.options = options;

        // when a node is added, panel will be re-rendered
        this.nodes_col.on("reset", this.render_panel, this);
        this.nodes_col.on("change", this.render_panel, this);
        this.breadcrumb_col.on("reset", this.render_breadcrumb, this);
        this.breadcrumb_col.on("change-parent", this.render_breadcrumb, this);
        this.ctx_menu_model.on("change", this.render_ctx_menu, this);
        // events generated by user
        this.panel_view.on(EV_PANEL_ITEM_CLICK, this.on_panel_item_click, this);
        this.panel_view.on(EV_PANEL_ITEM_SELECTED, this.node_selected, this);
        this.breadcrumb_view.on(EV_PANEL_ITEM_CLICK, this.on_panel_item_click, this);
        this.ctx_menu_view.on(EV_ACTION_CLICKED, this.action_clicked, this);

        this.ctx_menu_model.add(default_actions);
    }

    initial_fetch(folder) {
        let that = this;

        fetch_children(folder).then((nodes) => {
            that.nodes_col.reset(nodes);
            this.breadcrumb_col.change_parent(folder);
        }).catch((error) => {
            alert(`Error while fetchinf folder '${folder}': ${error}`);
        });
    }

    get_selection() {
        return this.nodes_col.filter(
            (node) => { return node.is_selected; }
        );
    }

    get_parent() {
        return this.breadcrumb_col.parent;
    }

    node_selected({node, selection}) {
        this.trigger(EV_PANEL_ITEM_SELECTED, {node, selection});
        this.ctx_menu_model.trigger(EV_PANEL_ITEM_SELECTED, {node, selection});
    }

    action_clicked(action) {
        action.run({
            selection: this.get_selection(),
            parent: this.get_parent()
        });
    }

    on_panel_item_click(node) {
        if (node.is_folder) {
            // invoke 'this.folder_clicked' with node as argument
            this.folder_clicked.apply(this, [node]);
        } else {
            // invoke 'this.document_clicked' with node as argument
            this.document_clicked.apply(this, [node]);
        }
    }

    folder_clicked(folder) {
        let that = this;

        this.breadcrumb_col.change_parent(folder);
        this.start_folder_clicked_feedback();
        // notice that `folder` parameter here might be `undefined`
        // (which means that user clicked the root folder).
        fetch_children(folder).then((nodes) => {
            that.nodes_col.reset(nodes);
            that.stop_folder_clicked_feedback();
        }).catch((error) => {
            that.stop_folder_clicked_feedback();
            alert(`Error while fetching folder '${folder}': ${error}`);
        });
    }

    document_clicked(doc) {
        // Panel does not know (and rightfully so)
        // what to do when document was clicked. Just
        // inform interested parties.
        this.trigger("document_click", doc);
    }

    start_folder_clicked_feedback() {
        /**
         * Provies folder click UI feedback.
         *
         * There might be (long) delays bewteen folder click event and
         * actual http server side response followed by changing of the folder
         * content. To provide user an immediate feedback, this function
         * performs following:
         *
         *  1. Marks current content of the folder (i.e. all nodes) as
         *   invisible. They are still present as model objects, but
         *   invisible in DOM (not visible, but still nodes take space).
         * This marking triggers a `change` event (which in turn
         * renders the panel view).
         *
         *  2. Displays a spinner.
         */
        this.nodes_col.forEach((node) => {
            // triggers change on the node model
            node.visible = false;
        });
        this.panel_view.show_loader();
    }

    stop_folder_clicked_feedback() {
        this.panel_view.hide_loader();
    }

    render_panel() {
        this.panel_view.render()
    }

    render_breadcrumb() {
        this.breadcrumb_view.render();
    }

    render_ctx_menu() {
        this.ctx_menu_view.render();
    }

    reset(item_or_items) {
        this.nodes_col.reset(item_or_items);
        this.breadcrumb_col.reset(new Collection());
    }

}

export { CommanderPanelView };