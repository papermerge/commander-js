import { ActionButtonsItem } from "./models/action_buttons_item";


let action_buttons_items = [
    new ActionButtonsItem({
        title: 'Upload',
        value: 'upload',
        css_icon_class: 'bi-cloud-upload',
        has_perm: true
    }),
    new ActionButtonsItem({
        title: 'New Folder',
        value: 'new-folder',
        css_icon_class: 'bi-plus-lg',
        has_perm: true
    }),
    new ActionButtonsItem({
        title: 'OCR Language',
        value: 'ocr-lang',
        has_perm: true
    }),
];

export { action_buttons_items };