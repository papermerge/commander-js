import os
import time
from argparse import ArgumentParser

from flask import (
    Flask,
    render_template,
    send_from_directory
)
from app.browser import (
    create_blueprint,
    global_context
)


def create_app(delay_seconds=0, no_cache=False):
    """
    Creates flask app.

    :param delay_seconds: delays ALL requests with this number of seconds
    :param no_cache: if True will intruct browsers to NOT use cache i.e.
        NOT to store pages (js,css,images)
    """

    app = Flask(__name__)

    app.jinja_env.auto_reload = True
    app.config['DEBUG'] = True

    app.register_blueprint(
        create_blueprint('mini-browser', request_delay=0.2),
        url_prefix='/03-mini-browser'
    )
    app.register_blueprint(
        # Simulate slow requests.
        # Each request will take `request_delay` seconds.
        create_blueprint('slow-quesries-browsing', request_delay=4),
        url_prefix='/04-slow-queries-browsing'
    )
    app.register_blueprint(
        create_blueprint('dual-panel-browsing', request_delay=0.4),
        url_prefix='/05-dual-panel-browsing'
    )
    app.register_blueprint(
        create_blueprint('selections-and-actions', request_delay=0.3),
        url_prefix='/05-selections-and-actions'
    )

    @app.route('/')
    def index():
        return render_template(
            "index.html",
            **global_context
        )

    @app.route('/01-basic-rendering')
    def basic_rendering():
        return render_template(
            "features/01-basic-rendering.html",
            **global_context
        )

    @app.route('/02-basic-panel-with-nodes')
    def basic_panel_with_nodes():
        return render_template(
            "features/02-basic-panel-with-nodes.html",
            **global_context
        )

    @app.route('/about')
    def about():
        return render_template(
            "about.html",
            **global_context
        )

    @app.route('/favicon.ico')
    def favicon():
        static_path = os.path.join(app.root_path, 'static')
        return send_from_directory(
            static_path,
            'favicon.ico',
            mimetype='image/vnd.microsoft.icon'
        )

    @app.before_request
    def slow_request():
        """
        Delay all requests with given number of seconds
        """
        time.sleep(delay_seconds)

    @app.after_request
    def add_header(r):
        """
        Please don't cache requests
        """
        if no_cache:
            r.headers["Cache-Control"] = "no-store"

        return r

    return app


def create_args():
    parser = ArgumentParser()
    parser.add_argument(
        "-d",
        "--delay",
        type=int,
        default=0,
        help="Delay all requests with this (integer) number of seconds"
    )
    parser.add_argument(
        "--no-cache",
        action="store_true",
        help="Instruct browsers to NOT cache pages"
    )
    parser.add_argument(
        "--host",
        help="The hostname to listen on",
        default="127.0.0.1"
    )
    parser.add_argument(
        "-p",
        "--port",
        help="The port of the webserver",
        type=int,
        default="5000"
    )
    args = parser.parse_args()

    return args


if __name__ == '__main__':

    args = create_args()
    app = create_app(
        delay_seconds=args.delay,
        no_cache=args.no_cache
    )
    app.run(args.host, args.port)
