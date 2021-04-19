import { Eventful } from "./eventful";
import { applyMixins } from "./utils";


class Collection extends Array {

    add(item_or_items) {
        let that = this;
        
        if (item_or_items.length) { // if an array
            item_or_items.map(function(item) {
                that.push(item);
            });
            return;
        }

        this.push(item_or_items);
    }

    get(_attrs) {
        for(let i=0; i <this.length;  i++) {
            let found = true;
            for(let key in _attrs) {
                if (_attrs[key] != this[i][key]) {
                    found = false;
                }
            }
            if (found) {
                return this[i];
            }
        }
    }
}

applyMixins(Collection, [Eventful]);

export { Collection };