import { View } from "../lib/view";
import { fetch_children } from "../requests";

import { CommanderPanelView } from "./commander_panel";


class CommanderDualPanelView extends View {

    constructor(options={}) {
        super();
        this.panel_view_left = new CommanderPanelView(
            options['panel_left']
        );
        this.panel_view_right = new CommanderPanelView(
            options['panel_right']
        );
    }

    initial_fetch(left_folder, right_folder) {
        /**
        Fetch left and right panel nodes for the very first time.

        Fetch nodes for first time has some cosmetical nuances:
            - loader is not shown
            - node placeholders provide user visual
                feedback about ongoing request
        */
        if (left_folder == right_folder) {
            // a small optimization here, perform a single request
            // as both left and right panels display same folder
            this._initial_fetch_same_folder(left_folder);
        } else {
            this._initial_fetch_diff_folders(left_folder, right_folder);
        }
    }

    _initial_fetch_diff_folders(left_folder, right_folder) {
        let that = this,
            left_promise,
            right_promise;

        left_promise = fetch_children(left_folder);
        right_promise = fetch_children(right_folder);

        Promise.all([left_promise, right_promise]).then(
            (values) => {
                that.panel_view_left.reset(values[0]);
                that.panel_view_right.reset(values[1]);
        }).catch((error) => {
            alert(`Error while fetching folders '${left_folder}', '${right_folder}': ${error}`);
        });
    }

    _initial_fetch_same_folder(folder) {
        let that = this;

        fetch_children(folder).then(
            (nodes) => {
                that.panel_view_left.reset(nodes);
                that.panel_view_right.reset(nodes);
            }
        ).catch(
            (error) => {
                alert(`Error while fetchinf folder '${folder}': ${error}`);
            }
        );
    }
}

export { CommanderDualPanelView };