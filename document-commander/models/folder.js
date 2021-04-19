import { Node } from "./node";


class Folder extends Node {
    
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