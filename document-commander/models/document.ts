import { Node } from "./node";


class Document extends Node {
    
    is_document():boolean {
        return true;
    }
    
    is_folder():boolean {
        return false;
    }
}

export { Document };