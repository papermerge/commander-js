import { Model, Collection } from "@papermerge/symposium";


class SortMode extends Model {
    constructor({title, value, is_divider=false, is_checked=false}) {
        super();

        this.title = title;
        this.value = value;
        this.is_divider = is_divider;
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


class SortModeCollection extends Collection {
    // a collection of SortMode models
}


let sort_mode_collection = new SortModeCollection();

sort_mode_collection.add(new SortMode({
    title: 'Title',
    value: 'title',
    is_checked: true
}));

sort_mode_collection.add(new SortMode({
    title: 'Date',
    value: 'date',
}));

sort_mode_collection.add(new SortMode({
    title: 'Type',
    value: 'type',
}));

sort_mode_collection.add(new SortMode({
    is_divider: true
}));

sort_mode_collection.add(new SortMode({
    title: 'Asc',
    value: 'asc'
}));

sort_mode_collection.add(new SortMode({
    title: 'Desc',
    value: 'desc'
}));

export {
    SortModeCollection,
    SortMode,
    sort_mode_collection
};