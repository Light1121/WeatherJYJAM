from flask import request
from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, current_user

from app.tabs.service import TabService

api = Namespace('my')
tab_service = TabService()


@api.route('/tabs')
class MyTabsApi(Resource):
    @jwt_required()
    def get(self):
        """Get current user's tabs"""
        tabs = tab_service.get_user_tabs(current_user.uid)
        return {
            'tabs': [tab.to_dict() for tab in tabs]
        }

    @jwt_required()
    def put(self):
        """Update current user's tabs"""
        data = request.get_json() or {}
        tabs_data = data.get('tabs', [])
        
        # Update all tabs for the user
        updated_tabs = tab_service.update_all_tabs(current_user.uid, tabs_data)
        
        return {
            'success': True,
            'tabs': [tab.to_dict() for tab in updated_tabs]
        }


@api.route('/tabs/<int:tab_id>')
class MyTabApi(Resource):
    @jwt_required()
    def get(self, tab_id):
        """Get a specific tab"""
        tab = tab_service.get_tab_by_id(tab_id, current_user.uid)
        if not tab:
            api.abort(404, f'Tab {tab_id} not found')
        
        return tab.to_dict()

    @jwt_required()
    def put(self, tab_id):
        """Update a specific tab"""
        data = request.get_json() or {}
        
        tab = tab_service.update_tab(
            tab_id=tab_id,
            uid=current_user.uid,
            tab_name=data.get('tab_name'),
            map_data=data.get('map'),
            pin_data=data.get('pin')
        )
        
        if not tab:
            api.abort(404, f'Tab {tab_id} not found')
        
        return {
            'success': True,
            'tab': tab.to_dict()
        }

    @jwt_required()
    def delete(self, tab_id):
        """Delete a specific tab"""
        success = tab_service.delete_tab(tab_id, current_user.uid)
        
        if not success:
            api.abort(404, f'Tab {tab_id} not found')
        
        return {
            'success': True,
            'message': f'Tab {tab_id} deleted successfully'
        }
