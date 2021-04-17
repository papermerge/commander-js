import { Node } from "./node";


class Folder extends Node {
    
    get is_document():boolean {
        return false;
    }
    
    get is_folder():boolean {
        return true;
    }

    get href(): string {
        return `/folder/${this.id}`;
    }
}

export { Folder };