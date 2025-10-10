from flask import request
from flask_restx import Resource, Namespace

api = Namespace('search')


@api.route('')
class SearchApi(Resource):
    def get(self):
        """Local search (dummy)"""
        query = request.args.get('q', '')
        return {
            'query': query,
            'results': []
        }


@api.route('/ai')
class SearchAiApi(Resource):
    def post(self):
        """AI search proxy (dummy)"""
        data = request.get_json() or {}
        return {
            'success': True,
            'answer': 'This is a dummy AI response',
            'question': data
        }
