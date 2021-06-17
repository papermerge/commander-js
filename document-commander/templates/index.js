import document_template from "./document.html";
import folder_template from "./folder.html";
import panel_list_template from "./panel/list.html";
import panel_grid_template from "./panel/grid.html";
import breadcrumb_template from "./breadcrumb.html";
import ctx_menu_template from "./ctx_menu.html";
import commander_template from "./commander.html";
import action_buttons_template from "./action_buttons.html";
import action_modes_template from "./action_modes.html";

import ab_new_folder_template from "./action_buttons/new_folder.html";
import ab_ocr_lang_template from "./action_buttons/ocr_lang.html";
import ab_upload_template from "./action_buttons/upload.html";

import am_details_template from "./action_modes/details.html";
import am_display_template from "./action_modes/display.html";
import am_open_template from "./action_modes/open.html";
import am_panel_template from "./action_modes/panel.html";
import am_sort_template from "./action_modes/sort.html";

// maps template_name to the actual template content
let templates_map = new Map();

templates_map.set('document.html', document_template);
templates_map.set('folder.html', folder_template);
templates_map.set('panel/list.html', panel_list_template);
templates_map.set('panel/grid.html', panel_grid_template);
templates_map.set('breadcrumb.html', breadcrumb_template);
templates_map.set('ctx_menu.html', ctx_menu_template);
templates_map.set('commander.html', commander_template);
templates_map.set('action_buttons.html', action_buttons_template);
templates_map.set('action_modes.html', action_modes_template);

templates_map.set('action_buttons/new_folder.html', ab_new_folder_template);
templates_map.set('action_buttons/ocr_lang.html', ab_ocr_lang_template);
templates_map.set('action_buttons/upload.html', ab_upload_template);

templates_map.set('action_modes/details.html', am_details_template);
templates_map.set('action_modes/display.html', am_display_template);
templates_map.set('action_modes/open.html', am_open_template);
templates_map.set('action_modes/panel.html', am_panel_template);
templates_map.set('action_modes/sort.html', am_sort_template);


export { templates_map };


