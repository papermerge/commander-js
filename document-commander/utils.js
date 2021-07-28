

function nodes_count({node, selection}) {
    /*
    * Counts number of folders and docs in given selection + node.
    *
    * Returns a dictionary with two keys:
    * - folder_count - number of folders
    * - doc_count - number of documents
    */
    let ret = {
        folder_count: 0,
        doc_count: 0
    };

    if (node && node.is_folder) {
        ret['folder_count'] = 1;
    } else if (node && node.is_document) {
        ret['doc_count'] = 1;
    }

    if (selection) {
        selection.forEach((item) => {
            if (item.is_folder) {
                ret['folder_count']++;
            } else if (item.is_document) {
                ret['doc_count']++;
            };
        });
    }

    return ret;
}

export { nodes_count }