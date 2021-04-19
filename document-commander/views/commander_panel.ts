import { PanelView } from "./panel/index";
import { BreadcrumbView } from "./breadcrumb";
import { 
    Node,
    Document,
    Folder,
    NodesCollection,
    Panel
} from "../models/index";
import { Breadcrumb } from "../models/breadcrumb";


const DEFAULT_OPTIONS = {
    'panel': {},
    'breadcrumb': {}
};


class CommanderPanelView {

    panel_model: Panel;
    breadcrumb_model: Breadcrumb;
    panel_view: PanelView;
    breadcrumb_view: BreadcrumbView;
    options: any;

    constructor({ nodes, parent, options }: {
            nodes?: NodesCollection;
            parent?: Node;
            options?: any;
        } = {options: DEFAULT_OPTIONS}
    ) {
        this.panel_model = new Panel({ nodes, parent });
        this.panel_view = new PanelView({
            model: this.panel_model,
            options: options['panel']
        });
        this.breadcrumb_model = new Breadcrumb(nodes);
        this.breadcrumb_view = new BreadcrumbView({
            breadcrumb: this.breadcrumb_model,
            options: options['breadcrumb']
        });
        this.options = options;

        // when a node is added, panel will be re-rendered 
        this.panel_model.on("change", this.render_panel, this);
        this.panel_model.on("parent_change", this.change_parent, this);
        this.breadcrumb_model.on("change", this.render_breadcrumb, this);
        this.panel_view.on("folder_clicked", this.folder_clicked, this);
        this.panel_view.on("document_clicked", this.document_clicked, this);
    }

    folder_clicked(folder: Folder) {
        console.log(`Folder id${folder.id}, title=${folder.title} clicked`);
    }

    document_clicked(doc: Document) {
        console.log(`Document id${doc.id}, title=${doc.title} clicked`);
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

    add(item_or_items: any) {
        this.panel_model.add(item_or_items);
    }

}

export { CommanderPanelView };