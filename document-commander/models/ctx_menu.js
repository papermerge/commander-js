import { Model } from '../lib/model';
import { Collection } from "../lib/collection";

class CtxMenu extends Model {

    constructor() {
        this.items = new Collection();
    }

    add(action_or_actions) {
        this.items.add(action_or_actions);
    }
}

export { CtxMenu };