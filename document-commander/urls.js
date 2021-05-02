

class UrlConf {
    /**
     *
     * Central point for managing urls.
     */

    constructor(prefix="/browser") {
        this.prefix = prefix;
    }

    folder_url(folder) {
        /**
         * `folder` parameter can be a `models.Folder` instance or
         * `undefined`. Latter means that user clicked root folder.
         */
        let folder_id = ""; // empty string in case of root folder.

        if (folder) {
            folder_id = folder.id;
        }
        // folder_id here can be empty string!
        return `${this.prefix}/folder/${folder_id}`;
    }

    document_url(document_id) {
        return `${this.prefix}/document/${document_id}`;
    }

    root_url() {
        return this.prefix;
    }
}

let urlconf = new UrlConf();


export { urlconf };