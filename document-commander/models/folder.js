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
        return urlconf.folder_url(this);
    }
}

export { Folder };