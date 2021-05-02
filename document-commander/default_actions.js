import { ActionItem } from "./models/action_item";

let default_actions = [
    {
        title: 'New Folder',
        icon_class: 'fa fa-plus',
        id: "#new-folder",
        condition: function(selection, parent_item) {
            return true;
        },
        run: function(selection)  {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
        }
    },
    {
        title: 'Rename',
        icon_class: 'fa fa-edit',
        id: "#rename",
        condition: function(selection, parent_item) {
            return selection.length == 1;
        },
        run: function(selection) {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
        }
    },
];

default_actions = default_actions.map(
    (params) => {
        let action_item;

        action_item = new ActionItem(params);
        action_item.run = action_item.run.bind(action_item);

        return action_item;
    }
);


export { default_actions }
