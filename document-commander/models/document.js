import { exceptions } from "@papermerge/symposium";
import { Node } from "./node";
import { urlconf } from "../urls";


class Document extends Node {

    constructor({
        id,
        title,
        parent,
        metadata,
        ocr_status
    }={}) {
        super({id, title, parent, metadata});

        this._ocr_status = ocr_status || Document.UNKNOWN;
    }

    toString() {
        return `Document(id=${this.id}, title=${this.title}, ...)`;
    }

    get ocr_status() {
        return this._ocr_status;
    }

    set ocr_status(value) {
        const valid_values = [
            Document.UNKNOWN,
            Document.RECEIVED,
            Document.STARTED,
            Document.SUCCEEDED,
            Document.FAILED
        ];

        if (!valid_values.includes(value)) {
            throw new exceptions.ValueError(
                `Invalid document status: ${value}`
            );
        }
        if (this._ocr_status !== value) {
            this._ocr_status = value;
            this.trigger("change");
        };
    }

    get is_document() {
        return true;
    }

    get is_folder() {
        return false;
    }

    get href() {
        return urlconf.document_url(this.id);
    }
}

// ocr status
Document.UNKNOWN = 'unknown';
Document.RECEIVED = 'received';
Document.STARTED = 'started';
Document.SUCCEEDED = 'succeeded';
Document.FAILED = 'failed';


export { Document };