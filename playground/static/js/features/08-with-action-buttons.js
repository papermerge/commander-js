window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander1;

    DC.urlconf.prefix = '/08-with-action-buttons';

    commander1 = new DC.CommanderView({'el': "#commander1"});
    commander1.open();
});