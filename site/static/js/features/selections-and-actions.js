window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander_panel,
        nodes;

    DC.urlconf.prefix = '/selections-and-actions';

    commander_panel = new DC.CommanderPanelView({
        'panel': {'el': document.querySelector('#panel')},
        'breadcrumb': {'el': document.querySelector("#breadcrumb")},
        'ctx_menu': {'el': document.querySelector('#ctx_menu')}
    });

    commander_panel.initial_fetch();
    commander_panel.on('document_clicked', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
    });
});