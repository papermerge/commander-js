window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander1;

    DC.urlconf.prefix = '/09-open-at-location';

    commander1 = new DC.CommanderView({'el': "#commander1"});
    commander1.open();
});