import { View } from "@papermerge/symposium";
import { UploaderView } from "@papermerge/uploader";

import { renderman } from "../../renderman";


class UploadButtonView extends View {
    /*
    * Very simple view to render upload button.
    */
    constructor({lang, parent, options}) {
        super(options);

        this.lang = lang;
        this.parent = parent;
        this.uploader_view = new UploaderView({
            lang: this.lang,
            parent: this.parent,
            options: {'el': document.querySelector('#uploader-view')}
        });

        this.listenTo(this.uploader_view, 'upload-success', this.on_upload_success);
    }

    events() {
        let events_map = {
            'click': 'on_click',
            "change input[type='file']": 'on_change',
        }

        return events_map;
    }

    on_click(event) {
        /*
            Upload button waas click. Just forwards click event
            to the hidden upload input/file element. 
        */
        let upload_hidden_input, that = this;

        upload_hidden_input = this.el.querySelector("input[type='file']");
        if (!upload_hidden_input) {
            console.error("Upload hidden input not found");
            return;
        }
        // proxy click event to the hidden file element
        upload_hidden_input.click();
    }

    on_change(event) {
        /*
            Change event occured on hidden input/files element.
            Handles files upload.
        */

        let data_transfer,
            files;

        files = event.target.files;

        this.uploader_view.upload({
            files: files,
            lang: this.lang,
            parent: this.parent
        });
    }

    on_upload_success(doc_dict) {
        console.log("UploadButtonView says: on_upload_success!");
        this.trigger('upload-success', doc_dict);
    }

    get default_template_name() {
        return "templates/action_buttons/upload.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {
            'has_perm': true
        }
    }
}

export { UploadButtonView };
