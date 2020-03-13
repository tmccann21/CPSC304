-- Drops all tables
DROP TABLE IF EXISTS coach;
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
    FOREIGN KEY (playerId) REFERENCES users (userId) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS coach (
    coachId INT PRIMARY KEY,
    age INT,
    gender varchar(64),
    FOREIGN KEY (coachId) REFERENCES users (userId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS leagueManager (
    managerId INT PRIMARY KEY,
    FOREIGN KEY (managerId) REFERENCES users (userId) ON UPDATE CASCADE ON DELETE CASCADE
);