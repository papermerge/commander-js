import { Node } from "./node";
import { document_url } from "../urls";


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
        return document_url(this.id);
    }
}

export { Document };