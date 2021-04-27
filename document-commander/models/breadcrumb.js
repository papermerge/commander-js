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

    change(folder) {
        let found,
            index,
            col,
            that = this;

        if (!folder) {
            this.nodes.reset([]);
            return;
        }
        // at this point `folder`` is defined
        found = this.nodes.get(folder);
        if (!found) {
            this.nodes.push(folder);
            this.trigger("change");
            return;
        }

        // change parent to one of existing ancestors
        index = this.nodes.findIndex(
            (node) => { return node.id == folder.id; }
        )

        if (index >= 0) {
            col = new Collection();
            col.add(this.nodes.slice(0, index + 1));
            this.nodes = col;
            this.nodes.on("change", function(){ that.trigger("change") } );
        }
        this.trigger("change");
    }
}

export { Breadcrumb };