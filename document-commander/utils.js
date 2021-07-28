

function nodes_count({node, selection}) {
    /*
    * Counts number of folders and docs in given selection + node.
    *
    * Returns a dictionary with two keys:
    * - folder_count - number of folders
    * - doc_count - number of documents
    *
    * If `node` is among `selection` - it won't be counted!
    * Duplicates within `selection` are not taken into account.
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
            if (item.is_folder && item.id ) {
                if (node && item.id != node.id) {
                    ret['folder_count']++;
                }
            } else if (item.is_document) {
                if (node && item.id != node.id) {
                    ret['doc_count']++;
                }
            };
        });
    }

    return ret;
}

export { nodes_count }