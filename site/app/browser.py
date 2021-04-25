import os

from flask import (
    Blueprint,
    render_template,
    request
)


def _get_template_name(req):
    name_with_slashes = req.url_rule.rule
    template_name = name_with_slashes.replace('/', '')

    return f"{template_name}.html"


def _static_folder_abs_path():
    """
    Returns absolute path to the static folder.
    Static folder is same as the one used by the app.
    """
    abs_path = os.path.join(os.path.dirname(__file__), '..', 'static')
    return abs_path


blueprint = Blueprint(
    'reusable_browsing_app',
    __name__,
    template_folder='templates',
    static_folder=_static_folder_abs_path()

)


# Mocks server responses for GET /folder/<int:folder_id>
FOLDERS = {
    -1: {
        'current_nodes': [
            {'title': 'invoice.pdf', 'id': 5, 'model': 'document'},
            {'title': 'payment_1.pdf', 'id': 1, 'model': 'document'},
            {'title': 'payment_2.pdf', 'id': 2, 'model': 'document'},
            {'title': 'My Documents', 'id': 3, 'model': 'folder'},
        ],
        # All ancestors are folders; thus there is no need to specify
        # model attribute.
        'ancestor_nodes': []
    },
    3: {
        # notice 'model' attribute which specifies type of node either document
        # or folder. There can be only two types of nodes: 'document' and
        # 'folder'
        'current_nodes': [
            {'title': 'mydoc1.pdf', 'id': 5, 'model': 'document'},
            {'title': 'mydoc2.pdf', 'id': 6, 'model': 'document'},
            {'title': 'Some Folder', 'id': 7, 'model': 'folder'},
        ],
        # All ancestors are folders; thus there is no need to specify
        # model attribute.
        'ancestor_nodes': [{'title': 'My Documents', 'id': 3}]
    },
    7: {
        'current_nodes': [
            {'title': 'inv1.pdf', 'id': 8, 'model': 'document'},
            {'title': 'inv2.pdf', 'id': 9, 'model': 'document'},
            {'title': 'inv3.pdf', 'id': 10, 'model': 'document'},
            {'title': 'inv4.pdf', 'id': 11, 'model': 'document'},
        ],
        # All ancestors are folders; thus there is no need to specify
        # model attribute.
        'ancestor_nodes': [
            {'title': 'My Documents', 'id': 3},
            {'title': 'Some Folder', 'id': 7},
        ]
    }
}

# Mocks server resonses for GET /document/<int:document_id>
DOCUMENTS = {
    1: {
        'document': {
            'id': 1,
            'title': 'payment_1.pdf'
        },
        'ancestor_nodes': []
    },
    2: {
        'document': {
            'id': 2,
            'title': 'payment_2.pdf'
        },
        'ancestor_nodes': []
    },
    5: {
        'document': {
            'id': 5,
            'title': 'invoice.pdf'
        },
        'ancestor_nodes': []
    },
}


@blueprint.route('/')
def browser():
    template_name = f"features/{_get_template_name(request)}"
    return render_template(template_name)


@blueprint.route('/folder/')
def browser_root_folder():
    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
        return FOLDERS.get(-1)


@blueprint.route('/folder/<int:node_id>')
def browser_folder(node_id):
    template_name = f"features/{_get_template_name(request)}"

    folder_dict = FOLDERS.get(node_id, None)
    if not folder_dict:
        return render_template("404.html"), 404

    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
        return folder_dict

    return render_template(
        template_name, **folder_dict
    )


@blueprint.route('/document/<int:node_id>')
def browser_document(node_id):
    template_name = f"features/{_get_template_name(request)}"
    document_dict = DOCUMENTS.get(node_id, None)

    if not document_dict:
        return render_template("404.html"), 404

    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
        return document_dict

    return render_template(
        template_name,
        **document_dict
    )
