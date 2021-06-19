import { Model, Collection } from "@papermerge/symposium";


class DisplayMode extends Model {
    /*
    Abstraction of a single item in display mode dropdown list
    */
    constructor({title, value, is_checked=false}) {
        super();

        this.title = title;
        this.value = value;
        this._is_checked = is_checked;
    }

    get is_checked() {
        return this._is_checked;
    }
    set is_checked(value) {
        this._is_checked = value;
        this.trigger("change");
    }
}


class DisplayModeCollection extends Collection {
    /*
    Abstraction of display mode dropdown list.
    As of now, there are only two items:
        * list
        * grid

    In future other display modes might be added.
    */
}


let display_mode_collection = new DisplayModeCollection();

display_mode_collection.add(new DisplayMode({
    title: 'List',
    value: 'list',
    is_checked: true
}));

display_mode_collection.add(new DisplayMode({
    title: 'Grid',
    value: 'grid',
}));


export {
    DisplayModeCollection,
    DisplayMode,
    display_mode_collection
};