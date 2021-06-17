import { View } from "@papermerge/symposium";
import { renderman } from "../../renderman";

class OCRLangView extends View {
    /**
    OCR Language dropdown view.

    Collection attribute is a collection of languages.
    */

    constructor({collection, options}) {
        super(options);
        this.collection = collection;
    }

    get default_template_name() {
        return "templates/action_buttons/ocr_lang.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {'items': this.collection};
    }
}

export { OCRLangView };
