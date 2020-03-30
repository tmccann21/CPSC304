-- Drops all tables
DROP TABLE IF EXISTS gamePlayed; 
DROP TABLE IF EXISTS teamRoster; 
DROP TABLE IF EXISTS teams; 
DROP TABLE IF EXISTS coachRecord; 
DROP TABLE IF EXISTS coach;
DROP TABLE IF EXISTS playsPosition;
DROP TABLE IF EXISTS playerStats; 
DROP TABLE IF EXISTS player;        -- need to drop tables in reverse order since if one table stills depend on another, dropping the latter would error
DROP TABLE IF EXISTS leagueOrganizedBy; 
DROP TABLE IF EXISTS leagueManager; 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS seasons; 
DROP TABLE IF EXISTS leagues; 
DROP TABLE IF EXISTS games; 
DROP TABLE IF EXISTS positions; 

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

CREATE TABLE IF NOT EXISTS leagues ( 
    leagueName varchar(64) PRIMARY KEY, 
    tier INT
); 

CREATE TABLE IF NOT EXISTS leagueOrganizedBy (
    managerId INT, 
    leagueName varchar(64), 
    PRIMARY KEY (managerId, leagueName),
    FOREIGN KEY (managerId) REFERENCES leagueManager (managerId) ON UPDATE CASCADE ON DELETE CASCADE, 
    FOREIGN KEY (leagueName) REFERENCES leagues (leagueName) ON UPDATE CASCADE ON DELETE SET NULL
); 

CREATE TABLE IF NOT EXISTS seasons (
    seasonYear INT, 
    leagueName varchar(64),
    PRIMARY KEY (leagueName, seasonYear), 
    FOREIGN KEY (leagueName) REFERENCES leagues (leagueName) ON UPDATE CASCADE ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS teams (
    teamName varchar(64) PRIMARY KEY,
    coachId INT NOT NULL, 
    captainID INT,
    FOREIGN KEY (coachId) REFERENCES coach (coachId) ON UPDATE CASCADE,
    FOREIGN KEY (captainId) REFERENCES player (playerId) ON UPDATE CASCADE ON DELETE SET NULL 
); 

CREATE TABLE IF NOT EXISTS teamRoster (
    playerId INT, 
    teamName varchar(64),
    year INT, 
    PRIMARY KEY (playerId, teamName), 
    FOREIGN KEY (playerId) REFERENCES player(playerId) ON UPDATE CASCADE ON DELETE CASCADE, 
    FOREIGN KEY (teamName) REFERENCES teams(teamName) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS games ( 
    time timestamp,  
    location varchar(64),
    PRIMARY KEY (time, location)
);

CREATE TABLE IF NOT EXISTS positions (
    positionName varChar(64) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS playsPosition (
    playerId INT,
    positionName varChar(64) DEFAULT '', 
    PRIMARY KEY (playerId, positionName),
    FOREIGN KEY (playerId) REFERENCES player(playerId) ON UPDATE CASCADE ON DELETE CASCADE, 
    FOREIGN KEY (positionName) REFERENCES positions(positionName) ON UPDATE CASCADE ON DELETE SET DEFAULT
);

CREATE TABLE IF NOT EXISTS coachRecord (
    coachId INT, 
    year INT, 
    winPercentage FLOAT, 
    PRIMARY KEY (coachId, year),
    FOREIGN KEY (coachId) REFERENCES coach(coachId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS playerStats (
    playerId INT, 
    year INT, 
    goals INT DEFAULT 0 NOT NULL, 
    assists INT DEFAULT 0 NOT NULL, 
    saves INT DEFAULT 0 NOT NULL, 
    plusminus INT DEFAULT 0 NOT NULL, 
    PRIMARY KEY (playerId, year), 
    FOREIGN KEY (playerId) REFERENCES player(playerId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gamePlayed (
    time timestamp, 
    location varchar(64),
    team1Name varchar(64),
    team2Name varchar(64) CHECK (team2Name <> team1Name),
    team1Score INT, 
    team2Score INT, 
    PRIMARY KEY (time, location), 
    FOREIGN KEY (time, location) REFERENCES games(time, location) ON UPDATE CASCADE ON DELETE CASCADE, 
    FOREIGN KEY (team1Name) REFERENCES teams(teamName) ON UPDATE CASCADE ON DELETE CASCADE, 
    FOREIGN KEY (team2Name) REFERENCES teams(teamName) ON UPDATE CASCADE ON DELETE CASCADE
);