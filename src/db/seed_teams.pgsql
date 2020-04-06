-- Insert teams 
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Vancouver Whitecaps', 3, 1);
INSERT INTO teams (teamName, coachId, captainId) VALUES ('FC Barcelona', 4, (SELECT playerId FROM player WHERE playerId=2));
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Real Madrid', 8, 6);
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Seattle Sounders', 9, null);
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Bayern Munich', 10, null);
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Manchester United', 11, null);

-- Insert team rosters 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (1, 'Vancouver Whitecaps', 2019); 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (7, 'Vancouver Whitecaps', 2018); 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (2, 'FC Barcelona', 2019); 

-- Inserts games 

INSERT INTO games (time, location) VALUES ( '2019-10-19 10:23:54', 'Vancouver');
INSERT INTO games (time, location) VALUES ( '2019-10-19 10:23:54', 'Atlanta');
INSERT INTO games (time, location) VALUES ( '2018-01-21 19:30:00', 'Dallas');

-- Inserts games played 

INSERT INTO gamePlayed (time, location, team1Name, team2Name, team1Score, team2Score) VALUES ('2019-10-19 10:23:54', 'Vancouver', 'Vancouver Whitecaps', 'FC Barcelona', 2, 4); 
INSERT INTO gamePlayed (time, location, team1Name, team2Name, team1Score, team2Score) VALUES ('2019-10-19 10:23:54', 'Atlanta', 'FC Barcelona', 'Real Madrid', 2, 1); 
INSERT INTO gamePlayed (time, location, team1Name, team2Name, team1Score, team2Score) VALUES ('2018-01-21 19:30:00', 'Dallas', 'FC Barcelona', 'Vancouver Whitecaps', 1, 5); 
