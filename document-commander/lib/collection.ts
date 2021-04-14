
class Collection<Type> extends Array<Type> {

    add(item_or_items: any): void {
        let that = this;
        
        if (item_or_items.length) { // if an array
            item_or_items.map(function(item:any) {
                that.push(item);
            });
            return;
        }

        this.push(item_or_items);
    }
}

export { Collection };