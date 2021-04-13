$(function(){
    let DC = DocumentCommander,
        commander_panel,
        dispatcher;

    dispatcher = _.clone(Backbone.Events);

    commander_panel = DC.CommanderPanelView(
        undefined,
        undefined,
        dispatcher,
        {
            'panel': {'el': $('#panel')},
            'breadcrumb': {'el': $("#breadcrumb")}
        }
    );

    dispatcher.trigger(
        "node.add",  // notice singular here
        {
            "title": "invoice.pdf",
            "type": "document"
        }
    );
    dispatcher.trigger(
        "nodes.add",  // notice plural here
        [
            {
                "title": "some_doc_1.pdf",
                "type": "document"
            },
            {
                "title": "some_doc_2.pdf",
                "type": "document"
            },
            {
                "title": "My Documents",
                "type": "folder"
            }
        ]
    );
});