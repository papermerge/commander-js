import { UrlConf, path } from "@papermerge/symposium";
import { Folder, Document } from "./models/index";

let urlpatterns = [
    path('folder/add/', 'folder_add'),
    path('folder/:folder_id/', 'folder'),
    path('document/:document_id/', 'document'),
    path('document/', 'ws_document'),  // url used for websockets (ws) connection
    path('document/:document_id/download/', 'document_download'),
    path('ocr-langs/', 'ocr_langs'),
],
prefix = '/core';

// there is only one UrlConf instance
let urlconf = new UrlConf({prefix, urlpatterns});


export { urlconf };