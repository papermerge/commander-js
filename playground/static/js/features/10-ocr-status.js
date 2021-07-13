window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        doc1,
        doc2,
        doc3,
        collection,
        commander,
        go_action,
        which_document,
        which_status;

    DC.urlconf.prefix = '/10-ocr-status';

    doc1 = new DC.Document({id: 1, title: "payment_1.pdf"});
    doc2 = new DC.Document({id: 2, title: "payment_2.pdf"});
    doc3 = new DC.Document({id: 5, title: "invoice.pdf"});

    collection = new DC.Collection();
    collection.add([doc1, doc2, doc3]);

    commander = new DC.CommanderView({'el': "#commander1"});
    commander.create_views();
    commander.reset(collection);

    go_action = document.querySelector('#go');
    which_status = document.querySelector("#which-status")
    which_document = document.querySelector("#which-document");
    if (!go_action) {
        console.error("#go DOM element not found");
        return;
    }

    if (!which_status) {
        console.error("#which-status DOM element not found");
        return;
    }

    if (!which_document) {
        console.error("#which-document DOM element not found");
        return;
    }

    go_action.addEventListener('click', () => {
        let doc_id, ocr_status, doc;

        doc_id = which_document.value;
        ocr_status = which_status.value;
        if (!doc_id && !ocr_action) {
            console.error("Both ocr_status and doc_id must be defined");
            return;
        }
        doc = collection.get({id: doc_id});
        if (!doc) {
            console.error(`Document with id=${doc_id} not found`);
            return;
        }
        // triggers change event on model => on collection =>
        // change event on collection triggers rendering
        doc.ocr_status = ocr_status;
    });
});