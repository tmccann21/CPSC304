INSERT INTO player (playerId, age, height, jerseyNumber) VALUES ( (SELECT userid FROM users WHERE userid=1) , 25, 180, 00);
INSERT INTO player (playerId, age, height, jerseyNumber) VALUES (2, 10, 100, 70);
--INSERT INTO player (playerId, age, height, jerseyNumber) VALUES (99, 90, 200, 21);

-- the first INSERT guarantees the foreign key constraint, if we try the third INSERT, seeding will throw an error because userID 99 doesnt exist in users)