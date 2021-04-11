$(function(){
    let panel, DC, panel_html, nodes;


    DC = DocumentCommander;
    nodes = [
        new DC.Document('invoice1.pdf'),
        new DC.Document('invoice2.pdf'),
        new DC.Folder('My Document')
    ]
    panel = new DC.Panel(nodes);
    panel_html = DC.render(
        "panel.html",
        {'object': panel}
    )

    $("#panel").html(panel_html);
});