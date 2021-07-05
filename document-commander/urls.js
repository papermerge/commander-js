import { Folder, Document } from "./models/index";


class UrlConf {
    /**
     *
     * Central point for managing urls.
     */

    constructor(prefix="/core") {
        this._prefix = prefix;
    }

    folder_add_url() {
        return `${this.prefix}/folder/add/`;
    }

    folder_url(folder) {
        let result;

        /**
         * `folder` parameter can be a `models.Folder` instance or
         * `undefined`. Latter means that user clicked root folder.
         */
        let folder_id = ""; // empty string in case of root folder.

        if (folder instanceof Folder) {
            folder_id = folder.id;
        } else if (folder) {
            // i.e. folder != undefined
            folder_id = folder;
        }
        // folder_id here can be empty string!
        result = `${this.prefix}/folder/${folder_id}`;
        if (folder_id) {
            // in django all URLs end with slash
            result += "/";
        }

        return result;
    }

    document_url(doc) {
        let doc_id;

        if (doc instanceof Document) {
            doc_id = doc.id;
        } else {
            doc_id = doc;
        }

        return `${this.prefix}/document/${doc_id}/`;
    }

    ocr_langs_url() {
        /* returns a list of server-side enabled OCR languages */
        return `${this.prefix}/ocr-langs/`;
    }

    root_url() {
        return this.prefix;
    }

    set prefix(value) {
        this._prefix = value;
    }

    get prefix() {
        return this._prefix;
    }
}

// there is only one UrlConf instance
let urlconf = new UrlConf();


export { urlconf };