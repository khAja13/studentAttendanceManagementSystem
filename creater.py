from index import app, db
from index import Admin

with app.app_context():
    db.create_all()