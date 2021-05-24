window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander_view;

    DC.urlconf.prefix = '/05-selections-and-actions';

    commander_view = new DC.CommanderView({
        'panel': {'el': document.querySelector('#panel')},
        'breadcrumb': {'el': document.querySelector("#breadcrumb")},
        'ctx_menu': {
            // context menu root element
            'el': document.querySelector("#selections-and-actions"),
            'el_menu': document.querySelector("div.ctx-menu")
        }
    });

    commander_view.open();
    commander_view.on('document-click', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
    });
});