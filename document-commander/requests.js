import { Collection } from "./lib/collection";


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
            ancestors = new Collection();

        nodes.add(json_response['current_nodes']);
        ancestors.add(json_response['ancestor_nodes']);

        return {nodes, ancestors};
    });
    
    return response;
}

export { fetch_children };