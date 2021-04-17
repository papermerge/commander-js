$(function(){
    let doc, folder, DC, doc_html, folder_html;

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

    $("#document").html(doc_html);
    $("#folder").html(folder_html);
});