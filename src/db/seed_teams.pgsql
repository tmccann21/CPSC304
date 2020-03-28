-- Insert teams 
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Vancouver Whitecaps', 3, 1);
INSERT INTO teams (teamName, coachId, captainId) VALUES ('FC Barcelona', 4, (SELECT playerId FROM player WHERE playerId=2));
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Real Madrid', 8, 6)

-- Insert team rosters 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (1, 'Vancouver Whitecaps', 2019); 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (7, 'Vancouver Whitecaps', 2018); 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (2, 'Barcelona', 2019); 

-- Inserts games 

INSERT INTO games (time, location) VALUES ( '2020-01-01T14:00:00', 'Vancouver');
INSERT INTO games (time, location) VALUES ( '2020-01-02T14:00:00', 'Atlanta');
INSERT INTO games (time, location) VALUES ( '2019-05-23T14:30:00', 'Dallas');

-- Inserts games played 

INSERT INTO gamePlayed (time, location, team1Name, team2Name, team1Score, team2Score) VALUES ('2020-01-01T14:00:00', 'Vancouver', 'Vancouver Whitecaps', 'FC Barcelona', 2, 4); 
INSERT INTO gamePlayed (time, location, team1Name, team2Name, team1Score, team2Score) VALUES ('2020-01-02T14:00:00', 'Atlanta', 'FC Barcelona', 'Real Madrid', 2, 1); 
INSERT INTO gamePlayed (time, location, team1Name, team2Name, team1Score, team2Score) VALUES ('2019-05-23T14:30:00', 'Dallas', 'FC Barcelona', 'Vancouver Whitecaps', 1, 5); 
