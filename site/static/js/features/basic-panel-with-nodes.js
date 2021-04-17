$(function(){
    let panel,
    DC,
    panel_list_html,
    panel_grid_html,
    nodes,
    panel_list_view,
    panel_grid_view;

    DC = DocumentCommander;

    nodes = new DC.NodesCollection();
    nodes.add([
        new DC.Document('invoice1.pdf'),
        new DC.Document('invoice2.pdf'),
        new DC.Folder('My Document')
    ]);
    panel = new DC.Panel({nodes: nodes});
    panel_list_view = new DC.PanelListView({panel: panel});
    panel_grid_view = new DC.PanelGridView({panel: panel});

    panel_list_html = panel_list_view.render();
    panel_grid_html = panel_grid_view.render();

    $("#panel-list").html(panel_list_html);
    $("#panel-grid").html(panel_grid_html);
});