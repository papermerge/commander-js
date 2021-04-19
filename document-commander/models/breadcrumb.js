import { Model } from "../lib/model";


class Breadcrumb extends Model {

    constructor(nodes) {
        super();
        this.nodes = nodes;
    }

    change_parent(nodes) {
        this.nodes = nodes;
    }
}

export { Breadcrumb };