import os

from flask import (
    Flask,
    render_template,
    request,
    send_from_directory
)
app = Flask(__name__)

app.jinja_env.auto_reload = True

FOLDERS = {
    3: {
        'current_nodes': [
            {'title': 'mydoc1.pdf', 'id': 5},
            {'title': 'mydoc2.pdf', 'id': 6}
        ],
        'ancestor_nodes': [ {'title': 'My Documents', 'id': 3} ] 
    }
}

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


@app.route('/mini-browser')
def mini_browser():
    return render_template("features/mini-browser.html")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/folder/<int:node_id>')
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


@app.route('/document/<int:node_id>')
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


@app.route('/favicon.ico')
def favicon():
    static_path = os.path.join(app.root_path, 'static')
    return send_from_directory(
        static_path,
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )