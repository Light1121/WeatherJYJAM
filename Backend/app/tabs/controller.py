from flask import request
from flask_restx import Resource, Namespace

api = Namespace('my')


@api.route('/tabs')
class MyTabsApi(Resource):
    def get(self):
        """Get user tabs data (dummy)"""
        return {
            'tabs': [
                {'id': 'home', 'title': 'Home'},
                {'id': 'map', 'title': 'Map'}
            ]
        }

    def put(self):
        """Update user tabs data (dummy)"""
        data = request.get_json() or {}
        return {
            'success': True,
            'saved': data
        }
