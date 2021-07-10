window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander,
        folder,
        breadcrumb;

    DC.urlconf.prefix = '/09-open-at-location';

    folder = {id: 3};
    breadcrumb = [
        {id: 1, title: "My documents", href: "/09-open-at-location/folder/3/"},
    ];
    commander = new DC.CommanderView({'el': "#commander1"});
    commander.open({folder, breadcrumb});
});