import { PanelView } from "./panel/index";
import { BreadcrumbView } from "./breadcrumb";
import { Collection } from "../lib/collection";
import { View } from "../lib/view";
import { Panel } from "../models/index";
import { Breadcrumb } from "../models/breadcrumb";
import { fetch_children } from "../requests";

import {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED,
    EV_NODE_SELECTED,
} from "../events";


class CommanderPanelView extends View {

    constructor(options={}) {
        super();
        this.panel_model = new Panel();
        this.panel_view = new PanelView({
            model: this.panel_model,
            options: options['panel']
        });
        this.breadcrumb_model = new Breadcrumb();
        this.breadcrumb_view = new BreadcrumbView({
            model: this.breadcrumb_model,
            options: options['breadcrumb']
        });
        this.ctx_menu_model = new CtxMenu();
        this.ctx_menu_view = new CtxMenuView({
            model: this.ctx_menu_model,
            options: options['ctx_menu']
        });
        this.options = options;

        // when a node is added, panel will be re-rendered
        this.panel_model.on("change", this.render_panel, this);
        this.breadcrumb_model.on("change", this.render_breadcrumb, this);
        // events generated by user
        this.panel_view.on(EV_FOLDER_CLICKED, this.folder_clicked, this);
        this.panel_view.on(EV_DOCUMENT_CLICKED, this.document_clicked, this);
        this.panel_view.on(EV_NODE_SELECTED, this.node_selected, this);
        this.breadcrumb_view.on(EV_FOLDER_CLICKED, this.folder_clicked, this);
        this.ctx_menu_view.on(EV_ACTION_CLICKED, this.action_clicked, this);
    }

    initial_fetch(folder) {
        let that = this;

        fetch_children(folder).then((nodes) => {
            that.panel_model.reset(nodes);
            this.breadcrumb_model.change_parent(folder);
        }).catch((error) => {
            alert(`Error while fetchinf folder '${folder}': ${error}`);
        });
    }

    get_selection() {
        return this.panel_model.get_selection();
    }

    node_selected(node, current_selection) {
        this.trigger(EV_NODE_SELECTED, node, current_selection);
        this.ctx_menu_view.render(node, current_selection);
    }

    action_clicked(action) {
        action.run(this.get_selection());
    }

    folder_clicked(folder) {
        let that = this;

        this.breadcrumb_model.change_parent(folder);
        this.start_folder_clicked_feedback();
        // notice that `folder` parameter here might be `undefined`
        // (which means that user clicked the root folder).
        fetch_children(folder).then((nodes) => {
            that.panel_model.reset(nodes);
            that.stop_folder_clicked_feedback();
        }).catch((error) => {
            that.stop_folder_clicked_feedback();
            alert(`Error while fetchinf folder '${folder}': ${error}`);
        });
    }

    document_clicked(doc) {
        // Panel does not know (and rightfully so)
        // what to do when document was clicked. Just
        // inform interested parties.
        this.trigger(EV_DOCUMENT_CLICKED, doc);
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
        this.panel_model.set_nodes_attr('visible', false);
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

    reset(item_or_items) {
        this.panel_model.reset(item_or_items);
        this.breadcrumb_model.reset(new Collection());
    }

}

export { CommanderPanelView };