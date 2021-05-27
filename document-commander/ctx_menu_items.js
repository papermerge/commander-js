import { CtxMenuItem } from "@papermerge/symposium";

/* All functions in `ctx_menu_items` must be declared
with `function` keyword.

Don't use arrow function here!

Arrow functions don't have their `this`, they inherited it
from surrounding context.
Arrow functions remember context at the time of
definitions - a context which cannot be changed.
*/
let ctx_menu_items = [
    {
        title: 'New Folder',
        icon_class: 'fa fa-plus',
        id: "#new-folder",
        condition: function({selection, parent}) {
            return true;
        },
        run: function({selection})  {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
        }
    },
    {
        title: 'Rename',
        icon_class: 'fa fa-edit',
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
];

ctx_menu_items = ctx_menu_items.map(
    (params) => {
        let action_item;

        action_item = new CtxMenuItem(params);
        /*
        Prepare correct context (i.e. `this` object) for
        the `run` function. `this` will point to
        action_item instance. It is possible only if
        `run` was declared using `function` keyword.
        */
        action_item.condition = action_item.condition.bind(action_item);
        action_item.run = action_item.run.bind(action_item);

        return action_item;
    }
);


export { ctx_menu_items }
