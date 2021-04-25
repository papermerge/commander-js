import os

from flask import (
    Flask,
    render_template,
    request,
    send_from_directory
)
from app.browser import blueprint as browser_blueprint

app = Flask(__name__)

app.jinja_env.auto_reload = True

app.register_blueprint(
    browser_blueprint,
    url_prefix='/mini-browser'
)
app.register_blueprint(
    browser_blueprint,
    url_prefix='/slow-queries-browsing'
)


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


@app.route('/favicon.ico')
def favicon():
    static_path = os.path.join(app.root_path, 'static')
    return send_from_directory(
        static_path,
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )