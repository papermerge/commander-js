import { Collection } from "./collection";


class View {

}
/**
 * A view on collection of items. User can select items, click on them
 * and invoke certain actions (registered beforehands) on one
 * or multiple items.
 * 
 * Use cases: 
 *  1. documents and folders (Node) in document commander.
 *  2. pages (Page) in thumbnail list in document viewer.
 * @class
 */
class CollectionView<T> {

    item_selector: string = ".item";

    constructor(item_selector: string) {
        this.item_selector = item_selector;
    }

    events() {
        let event_map = {
            "item_click": "on_item_clicked",
            "item_selected": "on_item_selected",
            "item_generic_action": "on_item_action"
        };

        return event_map;
    }

    on_item_clicked(item: T): void {
        throw new Error("Not yet implemented");
    }

    on_item_selected(item: T, items: Collection<T>): void {
        throw new Error("Not yet implemented");
    }

    on_item_action(
        {parent_item, current_item, selected_items, action}: {
            parent_item?: T,
            current_item?: T,
            selected_items?: Collection<T>,
            action: ItemAction<T>
        }
    ): void {
        throw new Error("Not yet implemented");
    }
}

export { View, CollectionView };