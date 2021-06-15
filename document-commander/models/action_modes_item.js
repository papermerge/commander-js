import { Model } from "@papermerge/symposium";


class ActionModesItem extends Model {
    constructor({title_css_class, value}) {
        super();
        this._title_css_class = title_css_class;
        this._value = value;
    }
}

export { ActionModesItem };