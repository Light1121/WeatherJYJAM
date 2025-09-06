from flask import request
from flask_restx import Resource, Namespace

from app.user.service import UserService
from app._utils.serializer import to_dict

api = Namespace('users')
user_service = UserService()

@api.route('/')
class UserListApi(Resource):
    def get(self):
        # Get all users from database
        users = user_service.get_all_users()
        return [to_dict(user) for user in users]
    
    def post(self):
        # Create new user with provided data
        data = request.get_json()
        
        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        # Create user
        user = user_service.create_user(username, email, password)
        
        return {
            'success': True,
            'message': 'User created successfully',
            'user': to_dict(user)
        }, 201

@api.route('/dummy')
class DummyUserApi(Resource):
    def post(self):
        # Create dummy user for testing
        user = user_service.create_dummy_user()
        return {
            'success': True,
            'message': 'User created successfully',
            'user': to_dict(user)
        }, 201

@api.route('/<string:user_id>')
class UserApi(Resource):
    def get(self, user_id):
        # Get user by ID
        user = user_service.get_user_by_id(user_id)
        if user:
            return to_dict(user)
        else:
            api.abort(404, f'User {user_id} not found')