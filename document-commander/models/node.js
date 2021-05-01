import { Model } from "../lib/model";
import { Metadata } from "./metadata";

class Node extends Model {

    constructor({
        id,
        title,
        parent,
        metadata
    }) {
        super();
        this.id = id;
        this.title = title;
        this.parent = parent;
        this.metadata = metadata;
        /*
        Visibility attribute is CLIENT SIDE SPECIFIC and it
        is used to provide UI feedback when changing folders during slow
        http reponses.

        With visible = true will be rendered and visible to the user
        i.e. in view the css style of the node will be set to visibility = 'visible'.
        With visible = false will be rendered but not visible to the user
        i.e. in view the css style of the node will be set to visibility = 'hidden'.

        Visibility attribute will be set to `false` durting the timespan between
        actual user click (to change the folder) and rendering
        of the NEW nodes (those old nodes will not be visible in that period).
        Coupled with showing of spinner/loader div element,
        it will convey to the idea that 'handling of user click is in progress'.

        By default node is visible (or in view context - node is rendered as visible).
        */
        this.visible = true;
        /*
        If node is visually selected
        */
        this.selected = false;
    }

    toString() {
        return `Node(id=${this.id}, title=${this.title}, ...)`;
    }

    get is_document() {
        return false;
    }
    get is_folder() {
        return false;
    }

    get is_selected() {
        return this.selected;
    }

    toggle_selection() {
        this.selected = !this.selected;
        return this.selected;
    }
}


export { Node };
