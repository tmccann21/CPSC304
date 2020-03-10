-- Drops users table
DROP TABLE IF EXISTS users;

-- Creates users table (Changed User to Users because User is reserved in PGSQL :/)
CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    phone varchar(64) NOT NULL,
    password varchar(64) NOT NULL
);