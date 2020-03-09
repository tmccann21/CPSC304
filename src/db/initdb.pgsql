-- Drops users table
DROP TABLE IF EXISTS users;

-- Creates users table
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) NOT NULL
);