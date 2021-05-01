

let default_actions = [
    {
        'name': 'New Folder',
        'icon_class': 'fa fa-plus',
        'id': "#new-folder",
        'condition': (selection, parent_item) => { return true; },
        'run': (selection, item, parent_item) => {
            console.log(`Action ${this.id}`);
            console.log(`selection = ${this.selection}`);
            console.log(`item = ${this.item}`);
            console.log(`parent_item = ${this.parent_item}`);
        }
    },
    {
        'name': 'Rename',
        'icon_class': 'fa fa-edit',
        'id': "#rename",
        'condition': (selection, parent_item) => {
            return selection.length == 1;
        },
        'run': (selection, item, parent_item) => {
            console.log(`Action ${this.id}`);
            console.log(`selection = ${this.selection}`);
            console.log(`item = ${this.item}`);
            console.log(`parent_item = ${this.parent_item}`);
        }
    },
];

default_actions = default_actions.map(
    (params) => {
        return new Action(params);
    }
);


export { default_actions }
