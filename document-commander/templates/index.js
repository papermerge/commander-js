import document_template from "./document.html";
import folder_template from "./folder.html";
import panel_list_template from "./panel/list.html";
import panel_grid_template from "./panel/grid.html";
import breadcrumb_template from "./breadcrumb.html";
import ctx_menu_template from "./ctx_menu.html";
import commander_template from "./commander.html";
import action_buttons_template from "./action_buttons.html";
import action_modes_template from "./action_modes.html";


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


export { templates_map };


