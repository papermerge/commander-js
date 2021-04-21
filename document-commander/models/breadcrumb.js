import { Model } from "../lib/model";


class Breadcrumb extends Model {

    constructor(nodes) {
        super();
        this.nodes = nodes;
    }

    reset(ancestors) {
        this.nodes.reset(ancestors);
    }
}

export { Breadcrumb };