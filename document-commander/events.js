
/**
 * Orignated in BasePanelView. Propagates as follows:
 *
 *   BasePanelView -> PanelView -> CommanderPanelView -> ...
**/
const EV_DOCUMENT_CLICKED = "document_clicked";
/**
 * Orignated in BasePanelView. Propagates as follows:
 *
 *  BasePanelView -> PanelView -> CommanderPanelView -> fetch_children(folder)
**/
const EV_FOLDER_CLICKED = "folder_clicked";

// originates in views.base.BasePanelView
const EV_NODE_SELECTED = "node_selected";
const EV_ACTION_CLICKED = "action_clicked";

export {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED,
    EV_NODE_SELECTED,
    EV_ACTION_CLICKED
}