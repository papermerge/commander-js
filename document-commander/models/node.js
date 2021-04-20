import { Model } from "../lib/model";
import { Metadata } from "./metadata";

class Node extends Model {

    constructor({
        id,
        title,
        parent,
        metadata
    }) {
        super();
        this.id = id;
        this.title = title;
        this.parent = parent;
        this.metadata = metadata;
    }

    toString() {
        return `Node(id=${this.id}, title=${this.title}, ...)`;
    }

    get is_document() {
        return false;
    }
    get is_folder() {
        return false;
    }
}


export { Node };
