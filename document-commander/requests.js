
function fetch_children(folder) {
    let url, options;

    url = `/folder/${folder.id}`;
    options = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    return fetch(url, options);
}

export { fetch_children };