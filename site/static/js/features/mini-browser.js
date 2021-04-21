window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander_panel,
        node,
        nodes;

    commander_panel = new DC.CommanderPanelView({
        options: {
            'panel': {'el': document.querySelector('#panel')},
            'breadcrumb': {'el': document.querySelector("#breadcrumb")}
        }
    });

    node = new DC.Document({id: 5, title: "invoice.pdf"});
    commander_panel.add(node);

    nodes = new DC.Collection();
    nodes.add(
        new DC.Document({id: 1, title: "payment_1.pdf"})
    );
    nodes.add(
        new DC.Document({id: 2, title: "payment_2.pdf"})
    );
    nodes.add(
        new DC.Folder({id: 3, title: "My Documents"})
    );
    
    commander_panel.add(nodes);
    commander_panel.on('document_clicked', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
      });
});