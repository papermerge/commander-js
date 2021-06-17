import { Model } from "@papermerge/symposium";


class ActionButtonsItem extends Model {

    constructor({title, css_icon_class, value, has_perm}) {
        super();

        this.css_icon_class = css_icon_class;
        this.title = title;
        this.value = value;
        this._has_perm = has_perm;
    }

    get has_perm() {
        return this._has_perm;
    }

    toString() {
        let klass = 'ActionButtonsItem',
            t = this.title,
            v = this.value,
            p = this.has_perm;

        return `${klass}(title=${t}, value=${v}, has_perm=${p})`;
    }
}

export { ActionButtonsItem };