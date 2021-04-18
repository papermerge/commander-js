import { Collection } from "./collection";


class View {

}

class CollectionView<T> {

    events() {
        let event_map = {
            "click": "on_clicked",
            "selected": "on_selected",
            "generic_action": "on_action"
        };

        return event_map;
    }

    on_clicked(item: T): void {
        throw new Error("Not yet implemented");
    }

    on_selected(item: T, items: Collection<T>): void {
        throw new Error("Not yet implemented");
    }

    on_node_action(
        {parent_item, current_item, selected_items, action}: {
            parent_item?: T,
            current_item?: T,
            selected_nodes?: Collection<T>,
            action: ItemAction<T>
        }
    ): void {
        throw new Error("Not yet implemented");
    }
}

export { View, CollectionView };