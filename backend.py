
# -- Imports --
import psutil
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)  # creates the Flask application

CORS(app) # CORS, configure this flask application

@app.route("/cpu")
def get_cpu():
    cpu_usage = psutil.cpu_percent(interval=1)
    return {"cpu": cpu_usage}

@app.route("/ram")
def get_ram():
    ram_usage = psutil.virtual_memory().percent
    return {"ram": ram_usage}

app.run()