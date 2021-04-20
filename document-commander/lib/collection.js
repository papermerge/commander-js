import { Eventful } from "./eventful";
import { applyMixins } from "./utils";


class Collection extends Array {

    constructor(...args) {
        if (Array.isArray(args) && args.length > 0) {
            super(args);
        } else {
            super(0);
        }
    }

    add(item_or_items) {
        let that = this;
        
        if (item_or_items.length) { // if an array
            item_or_items.map((item) => {
                that.push(item);
            });
            this.trigger("change");
            return;
        }

        this.push(item_or_items);
        this.trigger("change");
    }

    get(attrs) {
        /**
         * Returns exactly one item of the collection that matches given
         * set of attributes.
         * 
         * attrs - is expected to be a dictionary like object
         * 
         * Returns a collection item when found and `undefined` if item was
         * not found.
         * 
         * Examples:
         *  
         *  // returns item that matches by title
         *  collection.get({title: "Invoice1.pdf"})
         * 
         *  // returns item that matches by id
         *  collection.get({id: "101"})
         * 
         * Note that passed attributes with value 'undefined' will be ignored
         * i.e. col.get({id: 1}) is same as col.get({id: 1, title: undefined})
         * because title attribute will be ignored (because its
         * value is undefined).
         */
        for(let i=0; i < this.length;  i++) {
            let found = true;
            for(let key in attrs) {
                if (attrs[key] == undefined) {
                    continue;
                }
                if (attrs[key] != this[i][key]) {
                    found = false;
                }
            }
            if (found) {
                return this[i];
            }
        }
        return undefined;
    }
}

applyMixins(Collection, [Eventful]);

export { Collection };