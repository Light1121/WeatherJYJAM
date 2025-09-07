from flask import request
from flask_restx import Resource, Namespace
from sqlalchemy.exc import IntegrityError

from app.user.service import UserService
from app._utils.serializer import to_dict

api = Namespace('users')
user_service = UserService()


@api.route('/')
class UserListApi(Resource):
    def get(self):
        """Get all users"""
        users = user_service.get_all_users()
        return [to_dict(user) for user in users]
    
    def post(self):
        """Create a new user"""
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = user_service.create_user(username, email, password)
            return {
                'success': True,
                'message': 'User created successfully',
                'user': to_dict(user)
            }, 201
        except IntegrityError as e:
            # handle unique constraint error
            if 'UNIQUE constraint failed: users.email' in str(e):
                api.abort(400, 'Email already exists')
            elif 'UNIQUE constraint failed: users.username' in str(e):
                api.abort(400, 'Username already exists')
            else:
                api.abort(400, 'Database constraint violation')


@api.route('/<string:user_id>')
class UserApi(Resource):
    def get(self, user_id):
        """Get user by ID"""
        user = user_service.get_user_by_id(user_id)
        if not user:
            api.abort(404, f'User {user_id} not found')
        
        return to_dict(user)
    
    def put(self, user_id):
        """Update user by ID"""
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = user_service.update_user(user_id, username, email, password)
            if not user:
                api.abort(404, f'User {user_id} not found')
            
            return {
                'success': True,
                'message': 'User updated successfully',
                'user': to_dict(user)
            }
        except IntegrityError as e:
            if 'UNIQUE constraint failed: users.email' in str(e):
                api.abort(400, 'Email already exists')
            elif 'UNIQUE constraint failed: users.username' in str(e):
                api.abort(400, 'Username already exists')
            else:
                api.abort(400, 'Database constraint violation')
    
    def delete(self, user_id):
        """Delete user by ID"""
        success = user_service.delete_user(user_id)
        if not success:
            api.abort(404, f'User {user_id} not found')
        
        return {
            'success': True,
            'message': 'User deleted successfully'
        }