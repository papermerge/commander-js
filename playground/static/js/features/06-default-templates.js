window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander1,
        commander2;

    DC.urlconf.prefix = '/06-default-templates';

    commander1 = new DC.CommanderView({'el': "#commander1"});

    commander1.initial_fetch();
    commander1.on('document-click', (doc) => {
        let msg;

        msg = `Commander1 doc id=${doc.id} title=${doc.title} clicked`;
        console.log(msg);
    });

    commander2 = new DC.CommanderView({'el': "#commander2"});

    commander2.initial_fetch();
    commander2.on('document-click', (doc) => {
        let msg;

        msg =`Commander2 doc id=${doc.id} title=${doc.title} clicked`;
        console.log(msg);
    });
});