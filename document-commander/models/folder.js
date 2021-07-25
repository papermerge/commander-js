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

    equal(other) {
        /*
        Two Folder instances are considered equal if they have same `id` and
        `title` attributes */
        return this.id === other.id && this.title === other.title;
    }
}

export { Folder };