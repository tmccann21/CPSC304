INSERT INTO users (name, email, phone, password) VALUES ('Alice', 'alice@example.com', '+1 778 000 0000', '6dd38daf90562e8d907d817b9be22b1ea63fe12b991ced59f423308788cf28c4');
INSERT INTO users (name, email, phone, password) VALUES ('Bob', 'bob@google.com', '+1 604 001 1000', '1bcaba15cc9e4d93927590dbd2317a2782bb8335f687be7d5fc1f5ef8b8334f1');
INSERT INTO users (name, email, phone, password) VALUES ('Susan', 'sue@example.com', '+1 999 000 0000', '07bee75267745d6e7def85d8423546c26bf7bae6011c6816593c2cd2a7968aa3');
INSERT INTO users (name, email, phone, password) VALUES ('Joe', 'joe@joebro.com', '+9 000 100 1010', 'df29b37ac31c994bf56f0144fe4d0f7dd30085e86ba601d32d3f2058494cbb02');
INSERT INTO users (name, email, phone, password) VALUES ('Tim', 'timbo@hotmail.co.uk', '+12 123 1234', '56f7abe1d92b43480dd6cdfc41240e372867c76c846417dc70fa6566e0ec8f8b');
INSERT INTO users (name, email, phone, password) VALUES ('Jerry', 'jerry@gmail.com', '+111 111 11 11', 'longpassword');
INSERT INTO users (name, email, phone, password) VALUES ('Tom', 'tomandjerry@hotmail.com', '+1 234 456 7890', '192naksdasdlsadjadwoijlfa1323');


-- Inserts players

INSERT INTO player (playerId, age, height, jerseyNumber) VALUES ( (SELECT userid FROM users WHERE userid=1) , 25, 180, 00);
INSERT INTO player (playerId, age, height, jerseyNumber) VALUES (2, 10, 100, 70);
INSERT INTO player (playerId, age, height, jerseyNumber) VALUES (6, 20, 175, 22);
INSERT INTO player (playerId, age, height, jerseyNumber) VALUES (7, 19, 190, 1); 
--INSERT INTO player (playerId, age, height, jerseyNumber) VALUES (99, 90, 200, 21);

-- the first INSERT guarantees the foreign key constraint, if we try the third INSERT, seeding will throw an error because userID 99 doesnt exist in users)


-- Inserts coaches

INSERT INTO coach (coachId, age, gender) VALUES ( (SELECT userId FROM users WHERE userId=3), 45, 'female');
INSERT INTO coach (coachId, age, gender) VALUES ( (SELECT userId FROM users WHERE userId=4), 51, 'male');


-- Inserts league managers

INSERT INTO leagueManager (managerId) VALUES ( (SELECT userId FROM users WHERE userId=5) );