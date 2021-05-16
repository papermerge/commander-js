import { Model } from 'symposium';
import { Collection } from "symposium";

import { EV_PANEL_ITEM_SELECTED } from "symposium";


class CtxMenu extends Model {

    constructor() {
        super();
        this.items = new Collection();
        this.on(EV_PANEL_ITEM_SELECTED, this.on_node_selected, this);
    }

    add(action_or_actions) {
        this.items.add(action_or_actions);
        this.trigger("change");
    }

    on_node_selected({node, selection}) {
        this.items.forEach((item) => {
                item.enabled = item.condition({selection});
            }
        );
        this.trigger("change");
    }
}

export { CtxMenu };