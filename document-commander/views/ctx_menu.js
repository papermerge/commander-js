import { CtxMenuBaseView } from "@papermerge/symposium";
import { renderman } from "../renderman";

class CtxMenuView extends CtxMenuBaseView {

    get default_template_name() {
        return "templates/ctx_menu.html";
    }

    get default_template_engine() {
        return renderman;
    }
}

export { CtxMenuView };