import { Model } from "@papermerge/symposium";


class OcrLang extends Model {

    constructor({title, value, is_selected}) {
        super();

        this.title = title;
        this.value = value;
        this._is_selected = is_selected;
    }

    get is_selected() {
        return this._is_selected;
    }

    set is_selected(value) {
        this._is_selected = value;
        this.trigger("change");
    }
}

export { OcrLang };