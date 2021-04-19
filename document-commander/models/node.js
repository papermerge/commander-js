import { Model } from "../lib/model";
import { Metadata } from "./metadata";

class Node extends Model {

    constructor({
        id,
        title,
        parent,
        metadata
    }) {
        this.id = id;
        this.title = title;
        this.parent = parent;
        this.metadata = metadata;
    }

    get is_document() {
        return false;
    }
    get is_folder() {
        return false;
    }
}


export { Node };
