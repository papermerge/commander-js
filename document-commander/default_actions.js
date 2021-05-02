import { ActionItem } from "./models/action_item";

/* All functions in `default_actions` must be declared
with `function` keyword.

Don't use arrow function here!

Arrow functions don't have their `this`, they inherited it
from surrounding context.
Arrow functions remember context at the time of
definitions - a context which cannot be changed.
*/
let default_actions = [
    {
        title: 'New Folder',
        icon_class: 'fa fa-plus',
        id: "#new-folder",
        condition: function({selection, parent}) {
            return true;
        },
        run: function({selection, parent})  {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
            console.log(`parent = ${parent}`);
        }
    },
    {
        title: 'Rename',
        icon_class: 'fa fa-edit',
        id: "#rename",
        condition: function({selection, parent}) {
            return selection.length == 1;
        },
        run: function({selection, parent}) {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
            console.log(`parent = ${parent}`);
        }
    },
];

default_actions = default_actions.map(
    (params) => {
        let action_item;

        action_item = new ActionItem(params);
        /*
        Prepare correct context (i.e. `this` object) for
        the `run` function. `this` will point to
        action_item instance. It is possible only if
        `run` was declared using `function` keyword.
        */
        action_item.run = action_item.run.bind(action_item);

        return action_item;
    }
);


export { default_actions }
