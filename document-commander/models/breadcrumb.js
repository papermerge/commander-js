import { Collection  } from "../lib/collection";
import { Model } from "../lib/model";


class Breadcrumb extends Model {

    constructor(nodes=new Collection()) {
        super();
        let that = this;
        
        this.nodes = nodes;

        this.nodes.on("change", function(){ that.trigger("change") } );
    }

    reset(ancestors) {
        this.nodes.reset(ancestors);
    }
}

export { Breadcrumb };