import { Metadata } from "./metadata";

class Node {

    title: string;
    parent!: Node;
    metadata!: Metadata;

    constructor(
        title: string,
        parent?: Node,
        metadata?: Metadata
    ) {
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
