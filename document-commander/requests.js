import { Collection } from "@papermerge/symposium";
import { Request, JsonRequest } from "@papermerge/symposium";
import { Folder, Document } from "./models/index";
import { OcrLang } from "./models/ocr_lang";
import { urlconf } from "./urls";
import { settings } from "./conf";


class FetchFolder extends JsonRequest {
    /**
     Fetches children of given folder via ajax request.

    `folder` parameter can be either `undefined` or an instance of
     `models.folder.Folder` class.
    In case `folder` is `undefined` function will retrieve
    children of the root folder i.e. top most documents and folders
    for currently logged in user.

    Reponse is expected to be a json in following format:
        {
            'current_nodes': [
                {id, title, model},  # i.e. { id: some_id, title: some_tile, ... }
                {id, title, model},
                ...
            ]
        }

    'current_nodes' is an array of dictionaries with following keys:
        - id
        - title
        - model
    Notice that `model` key will be either 'document' or 'folder' depending
    of the type of node.
    */
    constructor(folder) {
        super();
        this.folder = folder;
    }

    get url() {
        let ret;

        if (this.folder && this.folder.id) {
            ret = urlconf.url('folder' , {
                folder_id: this.folder.id
            });
        } else if (this.folder) {
            ret = urlconf.url('folder' , {
                folder_id: this.folder
            });
        } else {
            ret = urlconf.url('folder');
        }

        return ret;
    }

    get() {
        let ret, response;

        ret = super.get();
        response = ret.then(json_response => {
            let nodes = new Collection(),
                breadcrumb_col,
                folders_arr,
                current_nodes;

            current_nodes = json_response['current_nodes'].map((item_attrs) => {
                if (item_attrs['model'] == 'document') {
                    return new Document(item_attrs);
                } else {
                    return new Folder(item_attrs);
                };
            });
            if (json_response['breadcrumb']) {
                breadcrumb_col = new Collection();
                folders_arr = json_response['breadcrumb'].map((item_attrs) => {
                    return new Folder(item_attrs);
                });
                breadcrumb_col.add(folders_arr);
            }
            nodes.add(current_nodes);

            return {nodes: nodes, breadcrumb: breadcrumb_col};
        });

        return response;
    }

    get default_settings() {
        return settings;
    }
}


class CreateNewFolder extends JsonRequest {
    constructor({title, parent}) {
        super();
        this.title = title;
        this.parent = parent;
    }

    get data() {
        return {
            'title': this.title,
            'parent_id': this.parent && this.parent.id
        };
    }

    get url() {
        return urlconf.url('folder_add');
    }

    get default_settings() {
        return settings;
    }
}


class DownloadDocument extends Request {
    constructor(doc) {
        this.doc = doc;
    }

    get url() {
        return urlconf.url(
            'download_document',
            {document_id: this.doc}
        );
    }

    get() {
        let ret;

        ret = fetch(this.url, this.options).then(
            respose => respose.blob()
        ).then( blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = doc.title;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });

        return ret;
    }
}


class OcrLangs extends JsonRequest {
    get url() {
        return urlconf.url('ocr_langs');
    }

    get() {
        return super.get().then((json_response) => {
            let ocr_langs = new Collection();

            ocr_langs = json_response['ocr_langs'].map((item_attrs) => {
                return new OcrLang(item_attrs);
            });

            return ocr_langs;
        });
    }

    get default_settings() {
        return settings;
    }
}


class DeleteNodes extends JsonRequest {
    constructor(selection) {
        this.selection = selection;
    }

    get data() {
        let nodes;

        nodes = this.selection.map((item) => {
            return {'id': item.id};
        });

        return {'nodes': nodes};
    }

    get url() {
        return urlconf.url('nodes');
    }

    get default_settings() {
        return settings;
    }
}

/* Thin layer of syntastic sugar */
function fetch_folder(folder) {
    return new FetchFolder(folder).get();
}

function fetch_ocr_langs() {
    return new OcrLangs().get();
}

function create_new_folder({folder, parent}) {
    return new CreateNewFolder({folder, parent}).post();
}

function download_document(doc) {
    return new DownloadDocument(doc).get();
}

function delete_nodes(selection) {
    return new DeleteNodes(selection).delete();
}

export {
    fetch_folder,
    fetch_ocr_langs,
    create_new_folder,
    download_document,
    delete_nodes
};