import { UrlConfs, UrlConf, path } from "@papermerge/symposium";


let core_urlpatterns = [
    // all paths here are prefixed with core
    path('folder/add/', 'folder_add'),
    path('folder/(:folder_id/)', 'folder'),
    path('document/:document_id/', 'document'),
    path('document/:document_id/download/', 'document_download'),
    path('nodes/', 'nodes'),
    path('nodes/move/', 'nodes_move'),
    path('ocr-langs/', 'ocr_langs'),
],
ws_urlpatterns = [
    // all paths here are prefixed with ws
    path('document/', 'document')
];

// there is only one UrlConf instance
let urlconf = new UrlConfs({default_prefix: 'core'});

urlconf.add(
    new UrlConf({
        prefix: 'core', urlpatterns: core_urlpatterns
    })
);

urlconf.add(
    new UrlConf({
        prefix: 'ws', urlpatterns: ws_urlpatterns
    })
);


export { urlconf };