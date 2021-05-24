
function _open(commander, folder, name) {
    if (commander) {
        commander.open(folder);
        commander.on('document-click', (doc) => {
            let msg;

            msg = `${name} doc id=${doc.id} title=${doc.title} clicked`;
            console.log(msg);
        });
    }
}

function _close(commander) {
    if (commander) {
        commander.close();
    }
}

function _attach_dummy(dom_id) {
    /*
    Attach a dummy element to dom_id and attach an event listener to it.
    */
    let dummy;

    dummy = document.querySelector(dom_id);

    dummy.innerHTML = '<a href="#" class="dummy">I am dummy</a>';
    dummy.querySelector('.dummy').addEventListener("click", () => {
        console.log(".dummy click");
    });
}


window.addEventListener('DOMContentLoaded', () => {
    let DC = DocumentCommander,
        commander1,
        commander2,
        go,
        which_commander,
        which_action;

    DC.urlconf.prefix = '/07-open-close';

    commander1 = new DC.CommanderView({'el': "#commander1"});
    commander2 = new DC.CommanderView({'el': "#commander2"});
    go = document.querySelector('#go');
    which_action = document.querySelector("#which-action");
    which_commander = document.querySelector("#which-commander");

    go.addEventListener('click', () => {
        let commander;

        console.log(which_action.value);
        console.log(which_commander.value);
        if (which_commander.value == "#commander1") {
            commander = commander1;
        } else {
            commander = commander2;
        }

        if (which_action.value == "open") {
            _open(commander, undefined, which_commander.value);
        } else if ( which_action.value == "close" ) {
            _close(commander);
        } else if (which_action.value == "insert-dummy") {
            _attach_dummy(which_commander.value);
        }
    });
});