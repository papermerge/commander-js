window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        doc1,
        doc2,
        doc3,
        collection,
        commander;

    DC.urlconf.prefix = '/10-ocr-status';

    doc1 = new DC.Document({id: 1, title: "payment_1.pdf"});
    doc2 = new DC.Document({id: 2, title: "payment_2.pdf"});
    doc3 = new DC.Document({id: 5, title: "invoice.pdf"});

    collection = new DC.Collection();
    collection.add([doc1, doc2, doc3]);

    commander = new DC.CommanderView({'el': "#commander1"});
    commander.create_views();
    commander.reset(collection);
});