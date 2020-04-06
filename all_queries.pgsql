-- insert operations

INSERT INTO users (name, email, phone, password)
VALUES ($[name], $[email], $[phone], $[password])
RETURNING userId, name, email, phone;

INSERT INTO playerStats (playerId, year, goals, assists, saves, plusminus)
VALUES ($[playerId], $[year], $[goals], $[assists], $[saves], $[plusminus])
RETURNING playerId, year, goals, assists, saves, plusminus;

INSERT INTO leaguemanager (managerId)
VALUES ($[managerId])
RETURNING managerId;

INSERT INTO coach (coachId, age, gender)
VALUES ($[coachId], $[age], $[gender])
RETURNING coachId, age, gender;

INSERT INTO player (playerId, age, height, jerseyNumber) 
VALUES ($[playerId], $[age], $[height], $[jerseyNumber])
RETURNING playerId, age, height, jerseyNumber;

INSERT INTO playsPosition (playerId, positionName)
VALUES ($[playerId], $[positionName])
RETURNING playerId, positionName;

INSERT INTO playerStats (playerId, year, goals, assists, saves, plusminus)
VALUES ($[playerId], $[year], $[goals], $[assists], $[saves], $[plusminus])
RETURNING playerId, year, goals, assists, saves, plusminus;

-- delete operations

DELETE FROM player 
WHERE $[searchfield~] = $[searchval]
RETURNING playerId, age, height, jerseyNumber;

DELETE FROM coach
WHERE $[searchfield~] = $[searchval]
RETURNING coachId, age, gender;

DELETE FROM leaguemanager 
WHERE managerId = $[managerId]
RETURNING managerId;

-- update operations

UPDATE player 
SET age = $[updateval]
WHERE playerId = $[searchval]
RETURNING playerId, age, height, jerseyNumber;

UPDATE player 
SET height = $[updateval]
WHERE playerId = $[searchval]
RETURNING playerId, age, height, jerseyNumber;

UPDATE player 
SET jerseyNumber = $[updateval]
WHERE playerId = $[searchval]
RETURNING playerId, age, height, jerseyNumber;

UPDATE coach 
SET age = $[updateval]
WHERE coachId = $[searchval]
RETURNING coachId, age, gender;

-- projection queries

SELECT name
FROM users 
WHERE userId = $[userId];

SELECT P.playerId, U.name, P.positionName
FROM playsPosition P, Users U
WHERE P.positionName = $[positionName]
AND P.playerId = U.userId;

SELECT P.playerId, U.name, P.positionName
FROM playsPosition P, Users U
WHERE P.playerId = U.userId;

SELECT positionName
FROM playsPosition
WHERE playerId = $[playerId];

-- join queries

SELECT u.name, p.jerseyNumber, ps.goals, ps.assists, ps.saves, ps.plusminus
FROM player p, playerStats ps, users u
WHERE u.userId = p.playerid and p.playerid = ps.playerid and $[condition];

SELECT M.managerId, U.name
FROM leaguemanager M, users U
WHERE M.managerId = $[managerId]
AND M.managerId = U.userId;

SELECT M.managerId, U.name
FROM leaguemanager M, users U
WHERE M.managerId = U.userId;

-- aggregation query

SELECT count(*)
FROM users;

-- nested aggregation queries

SELECT (playerId, SUM(goals), SUM(assists), SUM (saves), SUM(plusminus)) 
FROM playerStats
WHERE playerId = $[playerId]
GROUP BY playerId;

SELECT (playerId, ROUND(AVG(goals)::numeric,3), ROUND(AVG(assists)::numeric,3), ROUND(AVG(saves)::numeric,3), ROUND(AVG(plusminus)::numeric,3))
FROM playerStats 
WHERE playerId = $[playerId]
GROUP BY playerId;

SELECT (playerId, SUM(goals), SUM(assists), SUM (saves), SUM(plusminus))
FROM playerStats
GROUP BY playerId;

SELECT (playerId, ROUND(AVG(goals)::numeric,3), ROUND(AVG(assists)::numeric,3), ROUND(AVG(saves)::numeric,3), ROUND(AVG(plusminus)::numeric,3))
FROM playerStats 
GROUP BY playerId;

-- division query

SELECT u.name
FROM player p, users u
WHERE u.userId = p.playerid AND NOT EXISTS (
    (SELECT ps.year FROM playerStats ps)
      EXCEPT
    (SELECT ps2.year 
      FROM playerStats ps2
      WHERE p.playerid = ps2.playerid)
  )

  -- other queries

SELECT playerId, year, goals, assists, saves, plusminus
FROM playerStats
WHERE playerId = $[playerId]; 

SELECT playerId, year, goals, assists, saves, plusminus
FROM playerStats;

SELECT playerId, year, goals, assists, saves, plusminus
FROM playerStats
ORDER BY goals DESC
LIMIT $[count];

SELECT playerId, year, goals, assists, saves, plusminus
FROM playerStats
ORDER BY assists DESC
LIMIT $[count];

SELECT playerId, year, goals, assists, saves, plusminus
FROM playerStats
ORDER BY saves DESC
LIMIT $[count];

SELECT playerId, year, goals, assists, saves, plusminus
FROM playerStats
ORDER BY plusminus DESC
LIMIT $[count];

SELECT P.playerId, U.name, P.age, P.height, P.jerseyNumber
FROM player P, users U
WHERE P.playerId = $[playerId] 
AND P.playerId = U.userId;

SELECT P.playerId, U.name, P.age, P.height, P.jerseyNumber
FROM player P, users U
WHERE P.playerId = U.userId;

SELECT C.coachId, U.name, C.age, C.gender
FROM coach C, users U
WHERE C.coachId = $[coachId]
AND C.coachId = U.userId;

SELECT C.coachId, U.name, C.age, C.gender
FROM coach C, users U
WHERE C.coachId = U.userId;

SELECT userId, name, email, phone
FROM users
WHERE userId = $[userId];

SELECT userId, name, email, phone
FROM users;