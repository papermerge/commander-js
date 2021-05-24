import { Collection, View } from "symposium";
import { CtxMenu } from "symposium";
import { renderman } from "../renderman";

import { PanelView } from "./panel/index";
import { BreadcrumbView } from "./breadcrumb";

import { Breadcrumb } from "../models/breadcrumb";
import { CtxMenuView } from "./ctx_menu";
import { fetch_children } from "../requests";
import { ctx_menu_items } from "../ctx_menu_items";

import {
    EV_PANEL_ITEM_CLICK,
    EV_PANEL_ITEM_SELECTED,
    EV_CTX_MENU_ITEM_CLICK
} from "symposium";


class CommanderView extends View {
    /*
    Think of CommanderView as build from several pieces interacting one with
    another. These pieces are as follows:

        * Panel
        * Breadcrumb
        * Context Menu

    Panel is a collection of nodes. A node can be either a folder or a document
    (document model in this case, don't confuse with DOM concept of document).

    Breadcrumb is a collection of folders that indicates the current
    location witin the Panel.

    Context Menu is a collection of items which trigger different actions.

    CommanderView can be instanciated in two distinct ways:

        (1) from external dom elements
        (2) from its own default template

    (1) - Create CommanderView from External DOM Elements

    Instanciate CommanderView this way when you want more control on what DOM
elements are used for each individual component (panel, breadcrumb, context
menu). In this case CommanderView DOES NOT HAVE it's own internal DOM root
element: commander_view.el won't not defined.

    When CommanderView is created from external DOM elements it must receive
    as arguments following keys:

        * panel
        * breadcrumb
        * ctx_menu

    Following keys `panel`, `breadcrumb` and `ctx_menu` are passed down to the
    respective views i.e. whatever is in `panel` key will be verbatim
    transmitted as options to the PanelView, whatever is in `breadcrumb` key
    will be transmitted verbatim to the BreadcrumbView etc.

    For example:

        commander_view = new DC.CommanderView({
            'panel': {'el': document.querySelector('#panel')},
            'breadcrumb': {'el': document.querySelector("#breadcrumb")},
            'ctx_menu': {
                'el': document.querySelector("#selections-and-actions"),
                'el_menu': document.querySelector("div.ctx-menu")
            }
        });

    (2) - Create CommanderView from Its Own Default Template

    In this case CommanderView will be created from 'defaults': you provide
    just a DOM element where to attach (and render) commander.

    For example:

        commander_view = new DC.CommanderView({'el': "#commander"});

    `el` is the DOM element to which commander will attach itself. In this
    case commander_view.el is defined and points the "#commander" DOM
    HTMLElement.

    Once you have an reference to CommanderView, you can render it in two
    distinct ways:

        (A) using `open` method
        (B) using `create_views` and then `reset` method.

    (A) Use `open` Method

    High level API method `open` will render for you all nodes
    of the folder provided as argument. If `open` does not have any argument
    root nodes are rendered.

    (B) Use `create_views` and then `reset`

    This method give you more control.

    */
    get default_template_name() {
        return "templates/commander.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get ctx_menu_options() {
        /*
            If this.el is defined, it means that commander
            was build from its own template and it is attached
            to the root DOM element (this.el).
            In this case, context menu will have same root element
            as commander (i.e. it will listen to all clicks starting
            from this.el) and will attach rendered menu items to the
            .ctx-menu class element found under this.el.

            If this.el is not defined, this means ctx menu will
            be a DOM element provided by this.options['ctx_menu'] i.e.
            user desires custom context menu DOM element.
        */
        if (this.el) {
            return {
                'el': this.el,
                'el_menu': this.el.querySelector('.ctx-menu')
            }
        }

        return this.options['ctx_menu'];
    }

    get breadcrumb_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.breadcrumb')
            }
        }

        return this.options['breadcrumb'];
    }

    get panel_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.panel')
            }
        }

        return this.options['panel'];
    }

    constructor(options={}) {
        super(options);

        this.options = options;

        this.nodes_col = new Collection();
        this.breadcrumb_col = new Breadcrumb();
        this.ctx_menu_col = new CtxMenu();
    }

    create_views() {

        if (this.el) { // created from default template?
            this.render();
        }

        this.panel_view = new PanelView({
            collection: this.nodes_col,
            options: this.panel_options
        });

        this.breadcrumb_view = new BreadcrumbView({
            collection: this.breadcrumb_col,
            options: this.breadcrumb_options
        });

        this.ctx_menu_view = new CtxMenuView({
            collection: this.ctx_menu_col,
            options: this.ctx_menu_options
        });

        this.nodes_col.on("reset", this.render_panel, this);
        this.breadcrumb_col.on("reset", this.render_breadcrumb, this);
        this.breadcrumb_col.on("change-parent", this.render_breadcrumb, this);
        this.ctx_menu_col.on("reset", this.render_ctx_menu, this);
        this.ctx_menu_col.on("change", this.render_ctx_menu, this);

        // events generated by user
        this.panel_view.on(
            EV_PANEL_ITEM_CLICK,
            this.on_panel_item_click,
            this
        );
        this.panel_view.on(
            EV_PANEL_ITEM_SELECTED,
            this.on_item_selected,
            this
        );
        this.breadcrumb_view.on(EV_PANEL_ITEM_CLICK, this.on_panel_item_click, this);

        this.ctx_menu_view.on(
            EV_CTX_MENU_ITEM_CLICK,
            this.on_menu_item_click,
            this
        );

        this.ctx_menu_col.reset(ctx_menu_items);
    }

    open(folder) {
        let that = this;

        this.create_views();

        fetch_children(folder).then((nodes) => {
            that.nodes_col.reset(nodes);
            that.breadcrumb_col.change_parent(folder);
        }).catch((error) => {
            alert(`Error while fetching folder '${folder}': ${error}`);
        });
    }

    close() {

        if (this.panew_view) {
            this.panel_view.undelegateEvents();
            this.panel_view = undefined;
        }

        if (this.breadcrumb_view) {
            this.breadcrumb_view.undelegateEvents();
            this.breadcrumb_view = undefined;
        }

        if (this.ctx_menu_view) {
            this.ctx_menu_view.undelegateEvents();
            this.ctx_menu_view = undefined;
        }

        if( this.el ) {
            this.el.innerHTML = "";
        }
    }

    get_selection() {
        return this.nodes_col.filter(
            (node) => { return node.is_selected; }
        );
    }

    get_parent() {
        return this.breadcrumb_col.parent;
    }

    on_item_selected({item, selection}) {
        this.trigger(
            EV_PANEL_ITEM_SELECTED,
            {item, selection}
        );
        this.ctx_menu_col.trigger(
            EV_PANEL_ITEM_SELECTED,
            {item, selection}
        );
    }

    on_menu_item_click(action) {
        action.run({
            selection: this.get_selection(),
            parent: this.get_parent()
        });
    }

    on_panel_item_click(node) {
        if (!node) {
            // breadcrumb's `Home` was clicked
            // call this.folder_clicked with `undefined` node
            this.folder_clicked.apply(this);
        } else if (node.is_folder) {
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
        // Commander does not know (and rightfully so)
        // what to do when document was clicked. Just
        // inform interested parties.
        this.trigger("document-click", doc);
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
        this.panel_view.render();
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

    toString() {
        return `CommanderView`;
    }
}

export { CommanderView };