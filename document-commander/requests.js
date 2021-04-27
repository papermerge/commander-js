import { Collection } from "./lib/collection";
import { Folder, Document } from "./models/index";
import { urlconf } from "./urls";


function fetch_children(folder) {
    /**
     Fetches children of given folder via ajax request.

    `folder` parameter can be either `undefined` or an instance of
     `models.folder.Folder` class.
    In case `folder` is `undefined` function will retrieve
    children of the root folder i.e. top most documents and folders
    for currently logged in user.

    Reponse is expected to be a json in following format:
        {
            'current_nodes': [
                {id, title, model},  # i.e. { id: some_id, title: some_tile, ... }
                {id, title, model},
                ...
            ]
        }

    'current_nodes' is an array of dictionaries with following keys:
        - id
        - title
        - model
    Notice that `model` key will be either 'document' or 'folder' depending
    of the type of node.
    */
    let options,
        response,
        promise;

    options = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    response = fetch(urlconf.folder_url(folder), options).then((response) => {
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

        return nodes;
    });

    return response;
}

export { fetch_children };