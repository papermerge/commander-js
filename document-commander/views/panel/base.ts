import { NotImplemented } from "../../exceptions";
import { Panel } from "../../models/index";


class PanelBaseView {

    panel: Panel;

    constructor(panel: Panel) {
        this.panel = panel;
    }
    render(): never {
        throw new NotImplemented();
    }
};


export { PanelBaseView };
