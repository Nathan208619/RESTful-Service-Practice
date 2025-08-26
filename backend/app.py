from flask import Flask
from flask_cors import CORS

app = app = Flask(__name__)

CORS(app)

from app.csv import csv_bp
app.register_blueprint(csv_bp)

if __name__ == "__main__":
    app.run(debug=True)