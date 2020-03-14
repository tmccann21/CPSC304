-- Insert teams 
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Vancouver Whitecaps', 3, 1);
INSERT INTO teams (teamName, coachId, captainId) VALUES ('Barcelona', 4, (SELECT playerId FROM player WHERE playerId=2));

-- Insert team rosters 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (1, 'Vancouver Whitecaps', 2019); 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (7, 'Vancouver Whitecaps', 2018); 
INSERT INTO teamRoster (playerId, teamName, year) VALUES (6, 'Barcelona', 2019); 