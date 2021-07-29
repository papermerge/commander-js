

function nodes_count(selection) {
    /*
    * Counts number of folders and docs in given selection.
    *
    * Returns a dictionary with two keys:
    * - folder_count - number of folders
    * - doc_count - number of documents
    *
    * `selection` is a collection of nodes.
    */
    let ret = {
        folder_count: 0,
        doc_count: 0
    };

    if (selection) {
        selection.forEach((item) => {
            if (item.is_folder && item.id ) {
                ret['folder_count']++;
            } else if (item.is_document) {
                ret['doc_count']++;
            };
        });
    }

    return ret;
}

export { nodes_count }