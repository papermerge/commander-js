import { Model } from "../lib/model";
import { Metadata } from "./metadata";

class Node extends Model {

    id: number;
    title: string;
    parent!: Node;
    metadata!: Metadata;

    constructor(
        {id, title, parent, metadata}: {
            id: number,
            title: string,
            parent?: Node,
            metadata?: Metadata
        }
    ) {
        super();
        this.id = id;
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
