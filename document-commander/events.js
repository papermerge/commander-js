
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

export {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED
}