import { Model } from '../lib/model';
import { Collection } from "../lib/collection";

class CtxMenu extends Model {

    constructor() {
        this.actions = new Collection();
    }
}

export { CtxMenu };