window.addEventListener('DOMContentLoaded', () => {
    let panel,
    DC,
    panel_list_html,
    panel_grid_html,
    nodes,
    panel_list_view,
    panel_grid_view;

    DC = DocumentCommander;

    nodes = new DC.Collection();
    nodes.add([
        new DC.Document({id: 1, title: 'invoice1.pdf'}),
        new DC.Document({id: 2, title: 'invoice2.pdf'}),
        new DC.Folder({id: 3, title: 'My Document'})
    ]);
    panel_list_view = new DC.PanelView({
        collection: nodes,
        options: {
            'template_name': 'templates/panel/list.html'
        }
    });
    panel_grid_view = new DC.PanelView({
        collection: nodes,
        options: {
            'template_name': 'templates/panel/grid.html'
        }
    });

    panel_list_html = panel_list_view.render();
    panel_grid_html = panel_grid_view.render();

    document.querySelector("#panel-list").innerHTML = panel_list_html;
    document.querySelector("#panel-grid").innerHTML = panel_grid_html;
});