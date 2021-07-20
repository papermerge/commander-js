import { CtxMenuItem } from "@papermerge/symposium";
import { download_document, delete_nodes } from "./requests";

/* All functions in `ctx_menu_items` must be declared
with `function` keyword.

Don't use arrow function here!

Arrow functions don't have their `this`, they inherited it
from surrounding context.
Arrow functions remember context at the time of
definitions - a context which cannot be changed.
*/
let _ctx_menu_items = [
    {
        title: 'New Folder',
        icon_class: 'bi-folder-plus',
        id: "#new-folder",
        condition: function({selection, parent}) {
            return true;
        },
        run: function({selection})  {
            // proxy click event to commander's new_folder_button view
            if (this.parent_view && this.parent_view.new_folder_button_view) {
                this.parent_view.new_folder_button_view.trigger("click");
            }
        }
    },
    {
        title: 'Download',
        icon_class: 'bi-cloud-download',
        id: "#download",
        enabled: false,
        condition: function({selection, parent}) {
            return selection.length >= 1;
        },
        run: function({selection})  {
            if (selection.length == 1 && selection[0].is_document) {
                download_document(selection[0]);
            }
        }
    },
    {
        title: 'Rename',
        icon_class: 'bi-pencil',
        id: "#rename",
        enabled: false,
        condition: function({selection}) {
            return selection.length == 1;
        },
        run: function({selection, parent}) {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
        }
    },
    {
        title: 'Delete',
        icon_class: 'bi-x-lg text-danger',
        id: "#delete",
        enabled: false,
        condition: function({selection}) {
            return selection.length >= 1;
        },
        run: function({selection, parent}) {
            let confirmation, that = this;

            if (!confirm("Are you sure you want to delete selected nodes?")) {
                return;
            }

            delete_nodes(selection).then((json_reponse) => {
                this.parent_view.nodes_col.remove(json_reponse['nodes']);
            });
        }
    },
];


let singleton = undefined;


function ctx_menu_items({parent_view}) {
    /*
        On every call will return the same instance if menu items.
        Menu items instance use reference to the same `parent_view`.
    */

    // Inside `_ctx_menu_items`` this.parent_view.trigger(...) is used.
    // If N instances of `_ctx_menu_items` are declared, then
    // `trigger` method will fire multiple N times.
    // Here we make sure that only one instance of `_ctx_menu_items` is created
    if (!singleton) { // singleton == only one instance
        singleton = _ctx_menu_items.map((params) => {
            let action_item;

            action_item = new CtxMenuItem({parent_view, ...params});
            /*
            Prepare correct context (i.e. `this` object) for
            the `run` function. `this` will point to
            action_item instance. It is possible only if
            `run` was declared using `function` keyword.
            */
            action_item.condition = action_item.condition.bind(action_item);
            action_item.run = action_item.run.bind(action_item);

            return action_item;
        });
    }

    return singleton;
};


export { ctx_menu_items }
