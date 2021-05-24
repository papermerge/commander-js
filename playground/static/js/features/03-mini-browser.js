window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander_view,
        nodes;


    DC.urlconf.prefix = '/03-mini-browser';

    commander_view = new DC.CommanderView({
        'panel': {'el': document.querySelector('#panel')},
        'breadcrumb': {'el': document.querySelector("#breadcrumb")}
    });

    nodes = new DC.Collection();
    nodes.add(
        new DC.Document({id: 5, title: "invoice.pdf"})
    );
    nodes.add(
        new DC.Document({id: 1, title: "payment_1.pdf"})
    );
    nodes.add(
        new DC.Document({id: 2, title: "payment_2.pdf"})
    );
    nodes.add(
        new DC.Folder({id: 3, title: "My Documents"})
    );

    commander_view.create_views();

    commander_view.reset(nodes);
    commander_view.on('document-click', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
      });
});