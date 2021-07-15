import { Node } from "./node";
import { urlconf } from "../urls";


class Folder extends Node {

    toString() {
        return `Folder(id=${this.id}, title=${this.title}, ...)`;
    }

    get is_document() {
        return false;
    }

    get is_folder() {
        return true;
    }

    get href() {
        return urlconf.url(
            'folder',
            {'folder_id': this.id}
        );
    }
}

export { Folder };