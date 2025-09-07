-- clean old tables
DROP TABLE IF EXISTS users;

-- create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- insert test data
INSERT INTO users (username, email) VALUES ('test_user', 'test@example.com');