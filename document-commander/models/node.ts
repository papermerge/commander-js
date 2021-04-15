import { Model } from "../lib/model";
import { Metadata } from "./metadata";

class Node extends Model {

    title: string;
    parent!: Node;
    metadata!: Metadata;

    constructor(
        title: string,
        parent?: Node,
        metadata?: Metadata
    ) {
        super();
        this.title = title;
        this.parent = parent;
        this.metadata = metadata;
    }

    is_document():boolean {
        return false;
    }
    is_folder():boolean {
        return false;
    }
}


export { Node };
