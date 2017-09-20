from flask import got_request_exception, render_template
from flask import Flask, request, redirect, abort, url_for, session, escape

# Utility libaries
import os
try:
    # For c speedups
    from simplejson import loads, dumps, load
except ImportError:
    from json import loads, dumps, load

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(401)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Access Denied', 401


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500


@app.route('/')
def index():
    return render_template("index.html")


app.secret_key = 'number8'


def log_exception(sender, exception, **extra):
    """ Log an exception to our logging framework """
    sender.logger.debug('Got exception during processing: %s', exception)


got_request_exception.connect(log_exception, app)
