import { Folder, Document } from "./models/index";


class UrlConf {
    /**
     *
     * Central point for managing urls.
     */

    constructor(prefix="/browser") {
        this._prefix = prefix;
    }

    folder_url(folder) {
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
        return `${this.prefix}/folder/${folder_id}`;
    }

    document_url(doc) {
        let doc_id;

        if (doc instanceof Document) {
            doc_id = doc.id;
        } else {
            doc_id = doc;
        }

        return `${this.prefix}/document/${doc_id}`;
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