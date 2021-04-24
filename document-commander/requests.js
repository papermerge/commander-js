import { Collection } from "./lib/collection";
import { Folder, Document } from "./models/index";
import { folder_url } from "./urls";


function fetch_children(folder) {
    let options,
        promise,
        response;

    options = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    response = fetch(folder_url(folder), options).then((response) => {
        if (response.status != 200) {
            throw new Error(response.statusText);
        }
        // response.json() returns a Promise!
        return response.json();
    }).then(json_response => {
        let nodes = new Collection(),
            ancestors = new Collection(),
            current_nodes,
            ancestor_nodes;

        current_nodes = json_response['current_nodes'].map((item_attrs) => {
            if (item_attrs['model'] == 'document') {
                return new Document(item_attrs);
            } else {
                return new Folder(item_attrs);
            };
        });
        nodes.add(current_nodes);

        ancestor_nodes = json_response['ancestor_nodes'].map((item_attrs) => {
            return new Folder(item_attrs);
        });

        if (ancestor_nodes.length > 0) {
            ancestors.add(ancestor_nodes);
        }

        return {nodes, ancestors};
    });
    
    return response;
}

export { fetch_children };