import { Model } from "../lib/model";


class Breadcrumb extends Model {

    constructor(nodes) {
        super();
        this.nodes = nodes;
    }

    refresh(ancestors) {
        this.nodes = ancestors;
    }
}

export { Breadcrumb };