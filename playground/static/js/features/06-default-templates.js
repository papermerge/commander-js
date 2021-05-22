window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander_panel;

    DC.urlconf.prefix = '/07-default-templates';

    commander_panel = new DC.CommanderView({
        'el': document.querySelector("#commander")
    });

    commander_panel.initial_fetch();
    commander_panel.on('document_clicked', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
    });
});