# -*- coding: utf-8 -*-
# kate: space-indent on; indent-width 4; replace-tabs on;

import sys
import json
import re
import redis

from flask import Flask, request, jsonify, redirect, session, Response
from flask import send_from_directory
from datetime import timedelta, datetime


app = Flask(__name__)



@app.route("/")
def index():
    return jsonify(success=True)

@app.route("/set_start/<number>")
def set_start(number):
    r = redis.StrictRedis()
    r.set("start", number)
    return jsonify(success=True)

@app.route("/counter/<number>")
def counter(number):
    r = redis.StrictRedis()
    start = r.get("start") or 0
    return jsonify(result=range(int(start), int(number)),  success=True)

if __name__ == "__main__":
    app.debug = True

    app.run(host="127.0.0.1")
