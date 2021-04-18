import { Model } from "../lib/model";
import { Metadata } from "./metadata";

/**
 * Node is common ancestor of boths Folder and Document classes.
 *
 * @class
 */
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

    get is_document():boolean {
        return false;
    }
    get is_folder():boolean {
        return false;
    }
}


export { Node };
