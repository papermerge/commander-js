import { View } from "@papermerge/symposium";
import { UploaderView } from "@papermerge/uploader";

import { renderman } from "../../renderman";


class UploadButtonView extends View {
    /*
    * Very simple view to render upload button.
    */
    constructor({lang, parent_id, options}) {
        super(options);
        this.lang = lang;
        this.parent_id = parent_id;
    }

    events() {
        let events_map = {
            'click': 'onclick'
        }

        return events_map;
    }

    onclick(event) {
        let upload_hidden_input;

        upload_hidden_input = this.el.querySelector("input[type='file']");
        if (!upload_hidden_input) {
            console.error("Upload hidden input not found");
            return;
        }
        upload_hidden_input.click();
        upload_hidden_input.addEventListener('change', this.onchange);
    }

    onchange(event) {
        let data_transfer,
            files,
            uploader_view,
            that = this;

        files = event.target.files;

        uploader_view = new UploaderView({
            files: files,
            lang: this.lang,
            parent_id: this.parent_id,
            options: {'el': document.querySelector('#uploader-view')}
        });

        uploader_view.on('upload-success', (doc_dict) => {
            that.trigger('upload-success', doc_dict);
        });
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
