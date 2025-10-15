# app/tabs/service.py
from typing import List, Optional
from app.database import db
from app.tabs.model import Tab


class TabService:
    """Service for tab operations"""

    def get_user_tabs(self, uid: str) -> List[Tab]:
        """Get all tabs for a user"""
        return Tab.query.filter_by(uid=uid).all()

    def get_tab_by_id(self, tab_id: int, uid: str) -> Optional[Tab]:
        """Get a specific tab by ID (ensures it belongs to the user)"""
        return Tab.query.filter_by(id=tab_id, uid=uid).first()

    def create_tab(self, uid: str, tab_name: str, map_data: dict = None, pin_data: dict = None) -> Tab:
        """Create a new tab for a user"""
        tab = Tab(
            uid=uid,
            tab_name=tab_name,
            map=map_data,
            pin=pin_data
        )
        db.session.add(tab)
        db.session.commit()
        return tab

    def update_tab(self, tab_id: int, uid: str, tab_name: str = None, map_data: dict = None, pin_data: dict = None) -> Optional[Tab]:
        """Update an existing tab"""
        tab = self.get_tab_by_id(tab_id, uid)
        if not tab:
            return None

        if tab_name is not None:
            tab.tab_name = tab_name
        if map_data is not None:
            tab.map = map_data
        if pin_data is not None:
            tab.pin = pin_data

        db.session.commit()
        return tab

    def delete_tab(self, tab_id: int, uid: str) -> bool:
        """Delete a tab"""
        tab = self.get_tab_by_id(tab_id, uid)
        if not tab:
            return False

        db.session.delete(tab)
        db.session.commit()
        return True

    def update_all_tabs(self, uid: str, tabs_data: List[dict]) -> List[Tab]:
        """Update all tabs for a user (replace existing tabs)"""
        # Delete existing tabs
        Tab.query.filter_by(uid=uid).delete()
        
        # Create new tabs
        new_tabs = []
        for tab_data in tabs_data:
            tab = Tab(
                uid=uid,
                tab_name=tab_data.get('tab_name', tab_data.get('name', 'Unnamed Tab')),
                map=tab_data.get('map'),
                pin=tab_data.get('pin')
            )
            db.session.add(tab)
            new_tabs.append(tab)
        
        db.session.commit()
        return new_tabs
