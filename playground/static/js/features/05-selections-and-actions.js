window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander_panel,
        nodes;

    DC.urlconf.prefix = '/05-selections-and-actions';

    commander_panel = new DC.CommanderView({
        'panel': {'el': document.querySelector('#panel')},
        'breadcrumb': {'el': document.querySelector("#breadcrumb")},
        'ctx_menu': {
            // context menu root element
            'el': document.querySelector("#selections-and-actions"),
            'el_menu': document.querySelector("div.ctx-menu")
        }
    });

    commander_panel.open();
    commander_panel.on('document-click', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
    });
});