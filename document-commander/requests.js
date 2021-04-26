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
            ],
            'ancestor_nodes': [
                {id, title}
            ]
        }

    'current_nodes' is an array of dictionaries with following keys:
        - id
        - title
        - model
    Notice that `model` key will be either 'document' or 'folder' depending
    of the type of node.

    'ancestor_nodes' is an array of dictionaries of nodes ancestors i.e. each
    node in `ancestor_nodes` is a folder (this is why 'model' key is not present).
    First node in the list is the most recent ancestor folder provided in argument.
    Notice that last node in the list of 'ancestor_nodes' is NOT the root folder, as
    the root folder is assumed to be always there.
    'ancestor_nodes' are used to render breadcrumbs.
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