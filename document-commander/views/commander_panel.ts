import { AddOptions, Events, View } from "backbone";
import { PanelListView } from "../views/panel/list";
import { BreadcrumbView } from "./breadcrumb";
import { Node, NodesCollection, Panel} from "../models/index";
import { Breadcrumb } from "../models/breadcrumb";


class CommanderPanelView{

    panel: PanelListView;
    breadcrumb: BreadcrumbView;
    dispatcher: Events;
    options: any;

    constructor(
        nodes?: NodesCollection,
        parent?: Node,
        dispatcher?: Events,
        options?: any
    ) {
        this.panel = new PanelListView(
            new Panel(nodes, parent, dispatcher),
            options['panel']
        );
        this.breadcrumb = new BreadcrumbView(
            new Breadcrumb(nodes, dispatcher),
            options['breadcrumb']
        );
        this.dispatcher = dispatcher;
        this.options = options;
    }
}

export { CommanderPanelView };