from flask_restx import Resource, Namespace
from datetime import datetime
from zoneinfo import ZoneInfo

api = Namespace('users')

@api.route('/')
class UserApi(Resource):
    def get(self):
        ts = datetime.now(ZoneInfo("Australia/Sydney")).isoformat()
        return [{
            "userId": 1,
            "username": "dummy",
            "password": "dummy_password",
            "timestamp": ts
        },{
            "userId": 2,
            "username": "dummy2",
            "password": "dummy_password2",
            "timestamp": ts
        }]