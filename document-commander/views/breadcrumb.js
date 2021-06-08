import { BreadcrumbBaseView } from "@papermerge/symposium";
import { Breadcrumb } from "@papermerge/symposium";

import {
    EV_PANEL_ITEM_CLICK,
} from "@papermerge/symposium";


import { renderman } from "../renderman";
import { urlconf } from "../urls";


class BreadcrumbView extends BreadcrumbBaseView {

    get default_template_name() {
        return "templates/breadcrumb.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        let context = {};

        context['nodes'] = this.collection;
        context['root_url'] = urlconf.root_url();

        return context;
    }
};

export { BreadcrumbView };