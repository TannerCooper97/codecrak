--Question Table Creation
-- CREATE TABLE question_table
--   (question_id SERIAL PRIMARY KEY,
--     question_text TEXT NOT NULL, 
--     question_type VARCHAR(12) NOT NULL);

-- Answer Table Creation
-- DROP TABLE IF EXISTS answer_table;
-- CREATE TABLE answer_table
--   (question_id int, 
--   answer_text TEXT, 
--   answer_check BOOLEAN,
--   CONSTRAINT fk_questionID 
--   FOREIGN KEY(question_id) 
--   REFERENCES question_table(question_id));

-- AUTH Table Creation
-- DROP TABLE IF EXISTS auth;
-- CREATE TABLE auth (
-- user_id SERIAL PRIMARY KEY,
--   username VARCHAR(30),
--   password text,
-- about_me VARCHAR(255),
-- highscore int,
-- profile_pic TEXT);


-- Friends List Table Creation
-- DROP TABLE IF EXISTS friend_list
-- CREATE TABLE friend_list (
--   user_friends_id int NOT NULL REFERENCES profile(user_friends_id),
--   user_id int NOT NULL REFERENCES auth(user_id));


-- Dummy data inserts

-- INSERT INTO auth (username, password)
-- VALUES ('Sijin', 'Poggchamp');

-- DELETE FROM profile where user_id = 1;
-- INSERT INTO profile (user_id, username, user_friends_id, profilepic, about_me, highscore)
-- VALUES (1, 'Sijin', 2, 'poggers', 'Databases are kinda cool man', 500);

-- INSERT INTO question_table (question_text, question_type)
-- VALUES ('What clause allow you to filter records?', 'sql');

-- INSERT INTO answer_table (question_id, answer_text, answer_check)
-- VALUES(7,'FROM', false);

-- Join Test
-- SELECT a.answer_text
-- FROM answer_table a
-- JOIN question_table q ON(q.question_id = a.question_id)
-- WHERE a.answer_check = true AND q.question_type = 'sql';
