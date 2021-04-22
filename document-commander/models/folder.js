import { Node } from "./node";


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
        return `/folder/${this.id}`;
    }
}

export { Folder };