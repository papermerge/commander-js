import { Collection } from "@papermerge/symposium";
import { ActionModesItem } from "./models/action_modes_item";


let dropdown_sort_col = new Collection();
let display_col = new Collection();

dropdown_sort_col.add({
    title: 'Title', value: 'title', 'is_checked': true,
});
dropdown_sort_col.add({
    title: 'Date', value: 'title'
});
dropdown_sort_col.add({
    title: 'Type', value: 'type'
});
dropdown_sort_col.add({
    is_devider: true
});
dropdown_sort_col.add({
    title: 'Desc', value: 'desc'
});
dropdown_sort_col.add({
    title: 'Asc', value: 'asc', 'is_checked': true
});

display_col.add({
    title: 'Grid',
    value: 'grid',
    'is_checked': true,
    css_icon_class: 'bi-grid'
});

display_col.add({
    title: 'List',
    value: 'list',
    css_icon_class: 'bi-list'
});


let action_modes_items = [
    new ActionModesItem({
        css_icon_class: 'bi-sort-alpha-down',
        id: 'sort-dropdown',
        sub_items: dropdown_sort_col
    }),
    new ActionModesItem({
        css_icon_class: 'bi-grid',
        id: 'display-dropdown',
        sub_items: display_col
    }),
    new ActionModesItem({
        id: 'open-target',
        css_icon_class: 'bi-arrow-down',
        value: 'inline'
    }),
    new ActionModesItem({
        id: 'close',
        css_icon_class: 'bi-x',
        value: 'close'
    }),
];

export { action_modes_items };