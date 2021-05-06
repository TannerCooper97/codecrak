UPDATE auth
set profilepic = $2
WHERE user_id = $1;