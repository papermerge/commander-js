import { Metadata } from "./metadata";

class Node {

    title: string
    parent: Node
    metadata: Metadata

    constructor(
        title: string,
        parent?: Node,
        metadata?: Metadata
    ) {
        this.title = title;
        this.parent = parent;
        this.metadata = metadata;
    }
}


export { Node };
