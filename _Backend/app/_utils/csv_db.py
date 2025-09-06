import csv
import os
from typing import List, Dict, Optional
from datetime import datetime


class CSVDatabase:
    # CSV database utility class
    
    def __init__(self, csv_file_path: str):
        self.csv_file_path = csv_file_path
        self.ensure_file_exists()
    
    def ensure_file_exists(self):
        # Ensure CSV file exists, create if not
        if not os.path.exists(self.csv_file_path):
            os.makedirs(os.path.dirname(self.csv_file_path), exist_ok=True)
            # Create empty file with headers
            with open(self.csv_file_path, 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(['user_id', 'username', 'email', 'password'])
    
    
    def insert_row(self, data: List[str]):
        # Insert row data to CSV file
        with open(self.csv_file_path, 'a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(data)
    
    def read_all_rows(self) -> List[List[str]]:
        # Read all data rows (excluding header)
        with open(self.csv_file_path, 'r', newline='', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header row
            return [row for row in reader if row]  # Filter empty rows
    
    def find_by_field(self, field_index: int, value: str) -> Optional[List[str]]:
        # Find row by field index and value
        rows = self.read_all_rows()
        for row in rows:
            if len(row) > field_index and row[field_index] == value:
                return row
        return None
    
    def find_by_id(self, user_id: str) -> Optional[List[str]]:
        # Find user by user ID
        return self.find_by_field(0, user_id)
    
    def find_by_username(self, username: str) -> Optional[List[str]]:
        # Find user by username
        return self.find_by_field(1, username)
    
    def find_by_email(self, email: str) -> Optional[List[str]]:
        # Find user by email
        return self.find_by_field(2, email)
