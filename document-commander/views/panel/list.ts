import { render as original_render } from "../../renderman";
import { PanelBaseView } from "./base";


class PanelListView extends PanelBaseView {
    
    template_name: string = "templates/panel/list.html";
};


export { PanelListView };