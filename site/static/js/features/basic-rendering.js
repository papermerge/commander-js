window.addEventListener('DOMContentLoaded', () => {
    let doc,
        folder,
        DC,
        doc_html,
        folder_html,
        div_document,
        div_folder;

    DC = DocumentCommander;
    doc = new DC.Document({id: 1, title: "invoice.pdf"});
    folder = new DC.Folder({id: 2, title: "My Documents"});

    doc_html = DC.render(
        "document.html",  // path to the template
        {'node': doc}  // context
    );

    folder_html = DC.render(
        "folder.html",  // path to the template
        {'node': folder}  // context
    );

    div_document = document.querySelector("#document");
    div_folder = document.querySelector("#folder");
    div_document.innerHTML = doc_html;
    div_folder.innerHTML = folder_html;
});