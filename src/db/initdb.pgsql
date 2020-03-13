-- Drops all tables
DROP TABLE IF EXISTS player;        -- need to drop tables in reverse order since if one table stills depend on another, dropping the latter would error
DROP TABLE IF EXISTS users;

-- Creates users table (Changed User to Users because User is reserved in PGSQL :/)
CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    phone varchar(64) NOT NULL,
    password varchar(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS player (
    playerId INT PRIMARY KEY,
    age INT,
    height float(2),            -- DOUBLE doesn't exist in PSQL apparently...
    jerseyNumber INT,
    FOREIGN KEY (playerID) REFERENCES users (userId) ON UPDATE CASCADE ON DELETE CASCADE
);