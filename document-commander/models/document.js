import { Node } from "./node";


class Document extends Node {

    toString() {
        return `Document(id=${this.id}, title=${this.title}, ...)`;
    }
    
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