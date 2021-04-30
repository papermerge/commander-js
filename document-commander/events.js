
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
const EV_DOCUMENT_SELECTED = "document_selected";
// originates in views.base.BasePanelView
const EV_FOLDER_SELECTED = "folder_selected";

export {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED,
    EV_DOCUMENT_SELECTED,
    EV_FOLDER_SELECTED
}