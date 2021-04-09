from flask import Flask, render_template
app = Flask(__name__)

app.jinja_env.auto_reload = True


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/basic-rendering')
def basic_rendering():
    return render_template("features/basic-rendering.html")


@app.route('/about')
def about():
    return render_template("about.html")
