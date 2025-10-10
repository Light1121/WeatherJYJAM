from flask import request
from flask_restx import Resource, Namespace
from sqlalchemy.exc import IntegrityError

from app.user.service import UserService
from app._utils.serializer import to_dict

api = Namespace('auth')
meapi = Namespace('me')
user_service = UserService()


@api.route('/users')
class UserListApi(Resource):
    def get(self):
        """Get all users"""
        users = user_service.get_all_users()
        return [to_dict(user) for user in users]
    


@api.route('/users/<string:user_id>')
class UserApi(Resource):
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


@api.route('/register')
class RegisterApi(Resource):
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


@api.route('/login')
class LoginApi(Resource):
    def post(self):
        """User login"""
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        user = user_service.authenticate_user(username, email, password)
        if not user:
            api.abort(401, 'Invalid credentials')
        
        return {
            'success': True,
            'message': 'Login successful',
            'user': to_dict(user)
        }


@api.route('/logout')
class LogoutApi(Resource):
    def post(self):
        """User logout"""
        return {
            'success': True,
            'message': 'Logout successful'
        }


@meapi.route('/')
class MeApi(Resource):
    def get(self):
        """Get current user profile (dummy)"""
        return {
            'user': {
                'username': 'dummy_user',
                'email': 'dummy@example.com'
            }
        }


@meapi.route('/setting')
class MySettingApi(Resource):
    def get(self):
        """Get current user's setting (dummy)"""
        return {
            'user_id': 'me',
            'settings': {
                'theme': 'light',
                'language': 'en-US'
            }
        }

    def put(self):
        """Update current user's setting (dummy)"""
        data = request.get_json() or {}
        return {
            'success': True,
            'user_id': 'me',
            'updated_settings': data
        }


@meapi.route('/avatar')
class MeAvatarApi(Resource):
    def get(self):
        """Get current user avatar (dummy)"""
        return {
            'avatar_url': 'https://example.com/avatar.png'
        }

    def post(self):
        """Upload current user avatar (dummy)"""
        return {
            'success': True,
            'message': 'Avatar uploaded (dummy)'
        }, 201