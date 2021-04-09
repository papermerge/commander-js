$(function(){
    let doc, folder, DC, doc_html, folder_html;

    DC = DocumentCommander;
    doc = new DC.Document("invoice.pdf");
    folder = new DC.Folder("My Documents");

    doc_html = DC.render(
        "document.html",  // path to the template
        {'object': doc}  // context
    );

    folder_html = DC.render(
        "folder.html",  // path to the template
        {'object': folder}  // context
    );

    $("#document").html(doc_html);
    $("#folder").html(folder_html);
});