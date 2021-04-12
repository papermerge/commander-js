import { Node } from "./node";


class Folder extends Node {
    
    is_document():boolean {
        return false;
    }
    
    is_folder():boolean {
        return true;
    }
}

export { Folder };