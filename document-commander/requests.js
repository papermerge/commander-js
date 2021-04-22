import { Collection } from "./lib/collection";
import { Folder, Document } from "./models/index";


function fetch_children(folder) {
    let url,
        options,
        promise,
        response;

    url = `/folder/${folder.id}`;
    options = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    response = fetch(url, options).then(
        response => response.json()
    ).then(json_response => {
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

        ancestors.add(ancestor_nodes);

        return {nodes, ancestors};
    });
    
    return response;
}

export { fetch_children };