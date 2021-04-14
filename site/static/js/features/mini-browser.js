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

    node = new DC.Document("invoice.pdf");
    commander_panel.add(node);

    nodes = new DC.NodesCollection();
    nodes.add(new DC.Document("payment_1.pdf"));
    nodes.add(new DC.Document("payment_2.pdf"));
    nodes.add(new DC.Folder("My Documents"));
    
    commander_panel.add(nodes);
});