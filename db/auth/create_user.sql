INSERT INTO auth(username, password, profile_pic, about_me, highscore)
VALUES($1, $2, $3, $4, $5)
returning *