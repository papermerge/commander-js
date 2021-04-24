import { Node } from "./node";
import { folder_url } from "../urls";


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
        return folder_url(this);
    }
}

export { Folder };