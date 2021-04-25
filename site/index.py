import os

from flask import (
    Flask,
    render_template,
    request,
    send_from_directory
)
app = Flask(__name__)

app.jinja_env.auto_reload = True

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
        'ancestor_nodes': [  ]
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
        'ancestor_nodes': [ {'title': 'My Documents', 'id': 3} ]
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

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/basic-rendering')
def basic_rendering():
    return render_template("features/basic-rendering.html")


@app.route('/basic-panel-with-nodes')
def basic_panel_with_nodes():
    return render_template("features/basic-panel-with-nodes.html")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/mini-browser')
def mini_browser():
    return render_template("features/mini-browser.html")


@app.route('/mini-browser/folder/')
def mini_browser_root_folder():
    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
        return FOLDERS.get(-1)


@app.route('/mini-browser/folder/<int:node_id>')
def mini_browser_folder(node_id):
    folder_dict = FOLDERS.get(node_id, None)
    if not folder_dict:
        return render_template("404.html"), 404

    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
       return folder_dict

    return render_template(
        "features/mini-browser.html", **folder_dict
    )


@app.route('/mini-browser/document/<int:node_id>')
def mini_browser_document(node_id):
    document_dict = DOCUMENTS.get(node_id, None)
    
    if not document_dict:
        return render_template("404.html"), 404

    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
       return document_dict

    return render_template(
        "features/mini-browser.html",
        **document_dict
    )


@app.route('/slow-queries-browsing')
def slow_quering_browsing():
    return render_template("features/slow-queries-browsing.html")


@app.route('/slow-queries-browsing/folder/')
def slow_queries_browsing_root_folder():
    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
        return FOLDERS.get(-1)



@app.route('/slow-queries-browsing/folder/<int:node_id>')
def slow_queries_browsing_folder(node_id):
    folder_dict = FOLDERS.get(node_id, None)
    if not folder_dict:
        return render_template("404.html"), 404

    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
       return folder_dict

    return render_template(
        "features/slow-queries-browsing.html", **folder_dict
    )

@app.route('/slow-queries-browsing/document/<int:node_id>')
def slow_queries_browsing_document(node_id):
    document_dict = DOCUMENTS.get(node_id, None)
    
    if not document_dict:
        return render_template("404.html"), 404

    content_type = request.headers.get('Content-Type')
    if content_type and content_type == 'application/json':
       return document_dict

    return render_template(
        "features/slow-queries-browsing.html",
        **document_dict
    )


@app.route('/favicon.ico')
def favicon():
    static_path = os.path.join(app.root_path, 'static')
    return send_from_directory(
        static_path,
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )