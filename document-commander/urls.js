

const PREFIX = "/mini-browser"

function folder_url(folder_id) {
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