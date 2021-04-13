import { AddOptions, Events, View } from "backbone";
import { PanelListView } from "../views/panel/list";
import { BreadcrumbView } from "./breadcrumb";
import { Node, NodesCollection, Panel} from "../models/index";
import { Breadcrumb } from "../models/breadcrumb";


class CommanderPanelView{

    nodes: NodesCollection;
    parent: Node;
    panel_model: Panel;
    breadcrumb_model: Breadcrumb;
    panel_view: PanelListView;
    breadcrumb_view: BreadcrumbView;
    options: any;

    constructor(
        nodes?: NodesCollection,
        parent?: Node,
        options?: any
    ) {
        this.nodes = nodes;
        this.parent = parent;
        this.panel_model = new Panel({ nodes, parent });
        this.panel_view = new PanelListView(
            this.panel_model,
            options['panel']
        );
        this.breadcrumb_model = new Breadcrumb(nodes);
        this.breadcrumb_view = new BreadcrumbView(
            this.breadcrumb_model,
            options['breadcrumb']
        );
        this.options = options;

        // when a node is added, panel will be re-rendered 
        this.panel_model.on("change", this.render_panel, this);
        this.panel_model.on("parent_change", this.change_parent, this);
        this.breadcrumb_model.on("change", this.render_breadcrumb, this);
    }

    change_parent(nodes: NodesCollection) {
        this.breadcrumb_model.change_parent(nodes);
    }

    render_panel() {
        this.panel_view.render()
    }

    render_breadcrumb() {
        this.breadcrumb_view.render();
    }

    add(...args: [nodes: NodesCollection]) {
        //...
        /*
            this.panel_model.add(node);
        */
    }

}

export { CommanderPanelView };