-- SQLite

DROP TABLE test1;
CREATE TABLE test1 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    num INTEGER NOT NULL
);
INSERT INTO test1 (name, num) VALUES ( 'Test Name', 123);

SELECT * FROM test1;    