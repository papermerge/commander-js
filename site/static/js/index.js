$(function(){
    let doc, folder, DC, doc_html, folder_html;

    DC = DocumentCommander;
    doc = new DC.Document("invoice.pdf");
    folder = new DC.Folder("My Documents");

    doc_html = DC.render(
        "templates/document.html",
        doc
    );

    folder_html = DC.render(
        "templates/folder.html",
        folder
    );

    $("#document").html(doc_html);
    $("#folder").html(folder_html);
});