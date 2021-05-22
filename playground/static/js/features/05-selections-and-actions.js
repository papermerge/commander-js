window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander_panel,
        nodes;

    DC.urlconf.prefix = '/05-selections-and-actions';

    commander_panel = new DC.CommanderView({
        'panel': {'el': document.querySelector('#panel')},
        'breadcrumb': {'el': document.querySelector("#breadcrumb")},
        // context menu is attached to whole document
        'ctx_menu': {
            'el': document,
            'el_menu': document.querySelector("#ctx-menu")
        }
    });

    commander_panel.initial_fetch();
    commander_panel.on('document_clicked', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
    });
});