

const PREFIX = "/mini-browser"

function folder_url(folder) {
    /**
     * `folder` parameter can be a `models.Folder` instance or
     * `undefined`. Latter means that user clicked root folder.
     */
    let folder_id = ""; // empty string in case of root folder.

    if (folder) {
        folder_id = folder.id;
    }
    // folder_id here can be empty string!
    return `${PREFIX}/folder/${folder_id}`;
}

function document_url(document_id) {
    return `${PREFIX}/document/${document_id}`;
}

function root_url() {
    return PREFIX;
}


export {
    folder_url,
    document_url,
    root_url
};