$(function(){
    let DC = DocumentCommander,
        commander_panel,
        node,
        nodes;

    commander_panel = new DC.CommanderPanelView({
        options: {
            'panel': {'el': $('#panel')},
            'breadcrumb': {'el': $("#breadcrumb")}
        }
    });

    node = new DC.Document({id: 5, title: "invoice.pdf"});
    commander_panel.add(node);

    nodes = new DC.NodesCollection();
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
});