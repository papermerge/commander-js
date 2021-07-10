window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander,
        folder,
        breadcrumb;

    DC.urlconf.prefix = '/09-open-at-location';

    folder = new DC.Folder({id: 3});
    commander = new DC.CommanderView({'el': "#commander1"});
    commander.open({folder});
});