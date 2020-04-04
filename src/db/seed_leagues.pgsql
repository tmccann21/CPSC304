-- Inserts leagues 

INSERT INTO leagues (leagueName, tier) VALUES ('Major League Soccer', 2); 
INSERT INTO leagues (leagueName, tier) VALUES ('LaLiga', 1); 

-- Inserts league org chart 

INSERT INTO leagueOrganizedBy (managerId, leagueName) VALUES ((SELECT managerId from leagueManager where managerId = 5), 'Major League Soccer'); 

-- Inserts seasons 

INSERT INTO seasons (seasonYear, leagueName) VALUES (2019, 'Major League Soccer');
INSERT INTO seasons (seasonYear, leagueName) VALUES (2019, 'LaLiga');
INSERT INTO seasons (seasonYear, leagueName) VALUES (2018, 'Major League Soccer');

-- Inserts season participation

INSERT INTO seasonParticipation (teamName, seasonYear, record, leagueName) VALUES ('Vancouver Whitecaps', 2019, '30-0-0', 'Major League Soccer');
INSERT INTO seasonParticipation (teamName, seasonYear, record, leagueName) VALUES ('Real Madrid', 2019, '0-0-0', 'LaLiga');
INSERT INTO seasonParticipation (teamName, seasonYear, record, leagueName) VALUES ((SELECT teamName FROM teams WHERE teamName = 'FC Barcelona'), 2019, '0-1-0', (SELECT leagueName FROM seasons WHERE leagueName = 'LaLiga'));

-- Inserts season games
INSERT INTO seasonGame (seasonYear, time, location, leagueName) VALUES (2019, '2019-10-19 10:23:54', 'Vancouver', 'Major League Soccer');
INSERT INTO seasonGame (seasonYear, time, location, leagueName) VALUES (2019, '2019-10-19 10:23:54', 'Atlanta', 'LaLiga');
INSERT INTO seasonGame (seasonYear, time, location, leagueName) VALUES (2018, '2018-01-21 19:30:00', 'Dallas', 'Major League Soccer');