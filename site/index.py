from flask import Flask, render_template, request
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
    current_nodes, ancestor_nodes = FOLDERS.get(node_id, (None, None))
    if not current_nodes:
        return render_template("404.html"), 404

    request_xhr_key = request.headers.get('X-Requested-With')
    if request_xhr_key and request_xhr_key == 'XMLHttpRequest':
       return {
           'current_nodes': current_nodes,
           'ancestor_nodes': ancestor_nodes
       }

    return render_template(
        "features/mini-browser.html",
        current_nodes=current_nodes,
        ancestor_nodes=ancestor_nodes
    )


@app.route('/document/<int:node_id>')
def mini_browser_document(node_id):
    document, ancestor_nodes = DOCUMENTS.get(node_id, (None, None))
    if not document:
        return render_template("404.html"), 404

    request_xhr_key = request.headers.get('X-Requested-With')
    if request_xhr_key and request_xhr_key == 'XMLHttpRequest':
       return {
           'document': current_nodes,
           'ancestor_nodes': ancestor_nodes
       }

    return render_template(
        "features/mini-browser.html",
        document=current_nodes,
        ancestor_nodes=ancestor_nodes
    )
