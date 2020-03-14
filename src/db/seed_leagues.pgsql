-- Inserts leagues 

INSERT INTO leagues (leagueName, tier) VALUES ('Major League Soccer', 2); 
INSERT INTO leagues (leagueName, tier) VALUES ('LaLiga', 1); 

-- Inserts league org chart 

INSERT INTO leagueOrganizedBy (managerId, leagueName) VALUES ((SELECT managerId from leagueManager where managerId = 5), 'Major League Soccer'); 

-- Inserts seasons 

INSERT INTO seasons (seasonYear, leagueName) VALUES (2019, 'Major League Soccer');
INSERT INTO seasons (seasonYear, leagueName) VALUES (2019, 'LaLiga');
INSERT INTO seasons (seasonYear, leagueName) VALUES (2018, 'Major League Soccer');
