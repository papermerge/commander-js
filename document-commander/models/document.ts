import { Node } from "./node";


class Document extends Node {
    
    get is_document():boolean {
        return true;
    }
    
    get is_folder():boolean {
        return false;
    }

    get href() {
        return `/document/${this.id}`;
    }
}

export { Document };