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

    get(_attrs) {
        /**
         * Returns exactly one item of the collection that matches given
         * set of attributes.
         * 
         * Examples:
         *  
         *  // returns item that matches by title
         *  collection.get({title: "Invoice1.pdf"})
         * 
         *  // returns item that matches by id
         *  collection.get({id: "101"})
         */
        for(let i=0; i < this.length;  i++) {
            let found = true;
            for(let key in _attrs) {
                if (_attrs[key] == undefined) {
                    continue;
                }
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