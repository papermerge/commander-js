import { Node } from "./node";


class Document extends Node {
    
    get is_document() {
        return true;
    }
    
    get is_folder() {
        return false;
    }

    get href() {
        return `/document/${this.id}`;
    }
}

export { Document };