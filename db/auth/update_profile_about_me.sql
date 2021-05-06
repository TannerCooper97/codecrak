UPDATE auth
set about_me = $2
WHERE user_id = $1;