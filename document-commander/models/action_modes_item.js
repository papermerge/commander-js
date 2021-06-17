import { Model } from "@papermerge/symposium";


class ActionModesItem extends Model {
    constructor({id, css_icon_class, value, sub_items}) {
        super();

        this.id = id;
        this._css_icon_class = css_icon_class;
        this._value = value;
        this.sub_items = sub_items;
    }

    get css_icon_class() {
        return this._css_icon_class;
    }

    get value() {
        return this._value;
    }
}

export { ActionModesItem };