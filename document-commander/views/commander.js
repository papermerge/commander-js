import { Collection, View } from "@papermerge/symposium";
import { CtxMenu } from "@papermerge/symposium";
import { Breadcrumb } from "@papermerge/symposium";
import { NewFolderView } from "@papermerge/dialogs";

import { renderman } from "../renderman";
import { urlconf } from "../urls";

import { Document } from "../models/document";
import { Folder } from "../models/folder";
import { ActionButtons } from "../models/action_buttons";
import { ActionModes } from "../models/action_modes";

import { PanelView } from "./panel/index";
import { BreadcrumbView } from "./breadcrumb";

import { CtxMenuView } from "./ctx_menu";
import {
    fetch_folder,
    fetch_ocr_langs,
    create_new_folder
} from "../requests";
import { ctx_menu_items } from "../ctx_menu_items";
import { sort_mode_collection } from "../models/sort_mode";
import { display_mode_collection } from "../models/display_mode";

import { NewFolderButtonView } from "./action_buttons/new_folder";
import { OCRLangView } from "./action_buttons/ocr_lang";
import { UploadButtonView } from "./action_buttons/upload";

import { DetailsModeView } from "./action_modes/details";
import { DisplayModeView } from "./action_modes/display";
import { OpenModeView } from "./action_modes/open";
import { PanelModeView } from "./action_modes/panel";
import { SortModeView } from "./action_modes/sort";

import {
    EV_PANEL_ITEM_CLICK,
    EV_PANEL_ITEM_SELECTED,
    EV_CTX_MENU_ITEM_CLICK
} from "@papermerge/symposium";


class CommanderView extends View {
    /*
    CommanderView is build from several pieces interacting one with
    another:

        * Panel
        * Breadcrumb
        * Context Menu
        * Action Buttons (upload, new folder, OCR language)
        * Action Modes (sort, display, panel mode, open mode, details mode)

    Panel is a collection of nodes. A node can be either a folder or a document
    (document model in this case, don't confuse with DOM concept of document).

    Breadcrumb is a collection of folders that indicates the current
    location witin the Panel.

    Context Menu is a collection of items which trigger different actions.

    CommanderView can be instanciated in two distinct ways:

        (1) using external DOM elements
        (2) using its own default template

    (1) - Create CommanderView from External DOM Elements

    Instanciate CommanderView this way when you want more control on what DOM
elements which are used for each individual component (panel, breadcrumb, context
menu). In this case CommanderView DOES NOT HAVE it's own internal DOM root
element: commander_view.el won't not defined.

    When CommanderView is created from external DOM elements it must receive
    as arguments following keys:

        * panel
        * breadcrumb
        * ctx_menu
        etc

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

    constructor(options={}) {
        /*
            options is a dictionary with following keys:

                * el - DOM element to which commander will be attached
                * ctx_menu - options for contextual menu view
                * upload_button - options for upload button view
                * new_folder_button - options for new folder button view
                * ocr_lang_dropdown - options for ocr dropdown view
                * sort_mode_dropdown - options for sort mode dropdown view
                * display_mode_dropdown - options for display mode dropdown view
                * details_mode_button - options for details mode button view
                * open_mode_button - options for open mode button view
                * panel_mode_button - options for panel mode button view
                * breadcrumb - options for breadcrumb view
                * panel - options for panel view
        */
        super(options);
        let that = this;

        this.options = options;

        // current OCR language
        this.lang = 'deu';

        this.nodes_col = new Collection();
        this.breadcrumb_col = new Breadcrumb();
        this.ctx_menu_col = new CtxMenu();

        // collection of OCR languages
        // actual data is retrieved from the server
        this.ocr_lang_col = new Collection();
        fetch_ocr_langs().then((ocr_langs) => {
            that.ocr_lang_col.reset(ocr_langs);
        });

        // widgets metadata is not visible by default
        this.details_mode = DetailsModeView.HIDE;
        this.display_mode_col = display_mode_collection;
        this.open_mode = OpenModeView.INLINE;
        this.panel_mode = PanelModeView.DUAL;
        this.sort_mode_col = sort_mode_collection;
    }

    get default_template_name() {
        return "templates/commander.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_urlconf() {
        return urlconf;
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

    get upload_button_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.upload-action-wrapper')
            }
        }

        return this.options['upload_button'];
    }

    get new_folder_button_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.new-folder-action-wrapper')
            }
        }

        return this.options['new_folder_button'];
    }

    get ocr_lang_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.ocr-lang-action-wrapper')
            }
        }

        return this.options['ocr_lang_dropdown'];
    }

    get sort_mode_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.sort-mode-wrapper')
            }
        }

        return this.options['sort_mode_dropdown'];
    }

    get display_mode_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.display-mode-wrapper')
            }
        }

        return this.options['display_mode_dropdown'];
    }

    get details_mode_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.details-mode-wrapper')
            }
        }

        return this.options['details_mode_button'];
    }

    get open_mode_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.open-mode-wrapper')
            }
        }

        return this.options['open_mode_button'];
    }

    get panel_mode_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.panel-mode-wrapper')
            }
        }

        return this.options['panel_mode_button'];
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

    get breadcrumb() {
        return this.breadcrumb_col;
    }

    create_views() {
        let that = this;

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

        // action "buttons"
        // new folder button
        this.new_folder_button_view = new NewFolderButtonView({
            options: this.new_folder_button_options
        });
        // OCR language dropdown list
        this.ocr_lang_view = new OCRLangView({
            collection: this.ocr_lang_col,
            options: this.ocr_lang_options
        });
        // Upload button
        this.upload_button_view = new UploadButtonView({
            lang: this.lang,
            parent: this.breadcrumb_col.parent,
            options: this.upload_button_options
        });

        // action modes
        // toggles on/off extra views e.g. widgets panel
        this.details_mode_view = new DetailsModeView({
            mode: this.details_mode,
            options: this.details_mode_options
        });
        this.display_mode_view = new DisplayModeView({
            collection: display_mode_collection, // comes from antother module
            options: this.display_mode_options
        });
        this.open_mode_view = new OpenModeView({
            mode: this.open_mode,
            options: this.open_mode_options
        });
        this.panel_mode_view = new PanelModeView({
            model: this.panel_mode,
            options: this.panel_mode_options
        });
        this.sort_mode_view = new SortModeView({
            collection: sort_mode_collection, // comes from antother module
            options: this.sort_mode_options
        });

        this.listenTo(
            this.nodes_col,
            "add, remove, reset, change",
            this.render_panel
        );

        this.listenTo(this.breadcrumb_col, "change-parent, reset", this.render_breadcrumb);
        this.listenTo(this.breadcrumb_col, "change-parent", this.update_parent);

        this.listenTo(this.ctx_menu_col, "reset, change", this.render_ctx_menu);

        this.listenTo(this.ocr_lang_col, "reset", this.render_ocr_langs);
        this.listenTo(this.upload_button_view, "upload-success", this.add_document);
        this.listenTo(this.new_folder_button_view, "click", this.on_new_folder);

        this.panel_mode_view.on("switch-2-single", function() {
            that.trigger("switch-2-single");
        });
        this.panel_mode_view.on("switch-2-dual", function() {
            that.trigger("switch-2-dual");
        });
        this.on("mode-button-dual", function(){
            // dual commander transitioned from dual to single panel
            // and this panel is the one currently displayed.
            // Change its mode button to be ready to transition back
            // to dual mode - without triggering a message
            that.panel_mode_view._mode = PanelModeView.SINGLE;
            that.panel_mode_view.render();
        });
        this.panel_mode_view.on("change", this.render_panel_mode, this);
        this.panel_mode_view.on("change", this.update_panel_mode, this);

        this.open_mode_view.on("change", this.render_open_mode, this);
        this.open_mode_view.on("change", this.update_open_mode, this);
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
    }

    reset(item_or_items) {
        /* Resets commander to given items */

        this.nodes_col.reset(item_or_items);
        this.breadcrumb_col.reset(new Collection());
        this.render_action_buttons();
        this.render_action_modes();
    }

    open({folder, breadcrumb}={}) {
        /*
            Opens given folder and eventually updates breadcrumb.

            `folder` can be anything which has `id` attributes.
            if `folder` is undefined will open root location (i.e. top most folder).

            `breadcrumb`  is an array (or collection) of objects with following
            attributes: `id`, `title` and `href`. If `breadcrumb` is provided
            as argument is defined and non-empty it will reset commander's breadcrumb view.

            If `breadcrumb` provided as argument is undefined commander
            will update its breadcrumb based on data retrieved from server side.
        */
        let that = this;

        this.create_views();

        fetch_folder(folder).then((resp) => {
            that.nodes_col.reset(resp['nodes']);

            if (!breadcrumb) {
                if (resp['breadcrumb']) {
                    // server response's breadcrumb has higher priority
                    that.breadcrumb_col.reset(resp['breadcrumb']);
                } else {
                    that.breadcrumb_col.change_parent(folder);
                }
            } else {
                // breadcrumb proided as argument to `open` method
                // overwrites everything
                that.breadcrumb_col.reset(breadcrumb);
            }

            that.ctx_menu_col.reset(
                ctx_menu_items({parent_view: that})
            );
            that.render_action_buttons();
            that.render_action_modes();
            if (that.el) {
                that.el.style.display = 'block';
            }
            that.trigger("open", folder);
        }).catch((error) => {
            alert(`Error while fetching folder '${folder}': ${error}`);
        });
    }

    close({display}={display: true}) {

        if (this.panel_view) {
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

        if (this.new_folder_button_view) {
            this.new_folder_button_view.undelegateEvents();
            this.new_folder_button_view = undefined;
        }

        if( this.el ) {
            this.el.innerHTML = "";
        }
        if (!display) {
            this.el.style.display = 'None';
        }

        this.trigger("close");
    }

    wsevents() {
        // map websocket events
        let events_map = {
            // `ws:document` is prefixed urlconf's named url; `message` is websocket event type
            'ws:document message': 'on_wsdocument'
        };

        return events_map;
    }

    fullscreen() {
        this.el.classList.remove("col-6");
        this.el.classList.add("col-12");
    }

    halfscreen() {
        this.el.classList.remove("col-12");
        this.el.classList.add("col-6");
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
        fetch_folder(folder).then((resp) => {
            that.nodes_col.reset(resp['nodes']);
            that.stop_folder_clicked_feedback();
            that.trigger("folder-click", folder);
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

    add_document(doc_dict) {
        console.log(`commander ${doc_dict}`);
        let doc;

        doc = new Document(doc_dict);
        this.nodes_col.add(doc);
    }

    on_new_folder() {
        let new_folder_view,
            that = this,
            folder;

        new_folder_view = new NewFolderView({
            parent: this.breadcrumb_col.parent
        });

        new_folder_view.show();
        new_folder_view.on('submit', (kwargs) => {
            create_new_folder({
                title: kwargs['title'],
                parent: kwargs['parent']
            }).then((json_response) => {
                folder = new Folder({
                    id: json_response['folder']['id'],
                    parent: json_response['folder']['parent'],
                    title: json_response['folder']['title']
                });
                that.nodes_col.add(folder);
            });
        });
    }

    update_parent() {
        this.upload_button_view.parent = this.breadcrumb_col.parent;
        console.log(`New parent changed to ${this.upload_button_view.parent}`);
    }

    update_open_mode() {
        this.open_mode = this.open_mode_view.mode;
    }

    render_panel() {
        this.trigger("render");
        this.panel_view.render()
    }

    update_panel_mode() {
        this.panel_mode = this.panel_mode_view.mode;
    }

    render_breadcrumb() {
        this.breadcrumb_view.render();
    }

    render_ctx_menu() {
        this.ctx_menu_view.render();
    }

    render_action_modes() {
        if (this.details_mode_view) {
            this.details_mode_view.render();
        }

        if (this.display_mode_view) {
            this.display_mode_view.render();
        }
        this.render_open_mode();
        this.render_panel_mode();
        if (this.sort_mode_view) {
            this.sort_mode_view.render();
        }
    }

    render_action_buttons() {
        if (this.new_folder_button_view) {
            this.new_folder_button_view.render();
        }
        if (this.ocr_lang_view) {
            this.ocr_lang_view.render();
        }
        if (this.upload_button_view) {
            this.upload_button_view.render();
        }
    }

    render_ocr_langs() {
        if (this.ocr_lang_view) {
            this.ocr_lang_view.render();
        }
    }

    render_open_mode() {
        if (this.open_mode_view) {
            this.open_mode_view.render();
        }
    }

    render_panel_mode() {
        if (this.panel_mode_view) {
            this.panel_mode_view.render();
        }
    }

    toString() {
        return `CommanderView`;
    }

    on_wsdocument(event) {
        let message,
            doc,
            doc_id;

        message = JSON.parse(event.data);
        doc_id = message['document_id'];

        doc = this.nodes_col.get({id: doc_id});
        if (!doc) {
            // will happen when websocket message arrived before
            // adding document model to `this.nodes_col` collection
            return;
        }

        if (message['type'] == 'ocrdocumenttask.taskreceived') {
            doc.ocr_status = Document.RECEIVED;
        } else if (message['type'] == 'ocrdocumenttask.taskstarted') {
            doc.ocr_status = Document.STARTED;
        } else if (message['type'] == 'ocrdocumenttask.tasksucceeded') {
            doc.ocr_status = Document.SUCCEEDED;
        } else if (message['type'] == 'ocrdocumenttask.tasksfailed') {
            doc.ocr_status = Document.FAILED;
        }
    }
}

export { CommanderView };