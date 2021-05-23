window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander;

    DC.urlconf.prefix = '/06-default-templates';

    commander = new DC.CommanderView({'el': "#commander"});

    commander.initial_fetch();
    commander.on('document_clicked', (doc) => {
        alert(`Document id=${doc.id} title=${doc.title} clicked`);
    });
});