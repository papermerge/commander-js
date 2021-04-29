window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        duo_commander;


    DC.urlconf.prefix = '/dual-panel-browsing';

    duo_commander = new DC.CommanderDualPanelView({
        'panel_left': {
            'panel': {
                'el': document.querySelector('#panel_left'),
                'loader_selector': '#loader_left'
            },
            'breadcrumb': {
                'el': document.querySelector("#breadcrumb_left")
            },
        },
        'panel_right': {
            'panel': {
                'el': document.querySelector('#panel_right'),
                'loader_selector': '#loader_right'
            },
            'breadcrumb': {
                'el': document.querySelector("#breadcrumb_right")
            },
        }
    });

    duo_commander.initial_fetch();
    duo_commander.panel_view_left.on('document_clicked', (doc) => {
        alert(`Panel Left: doc id=${doc.id} title=${doc.title} clicked`);
    });

    duo_commander.panel_view_right.on('document_clicked', (doc) => {
        alert(`Panel Right: doc id=${doc.id} title=${doc.title} clicked`);
    });
});