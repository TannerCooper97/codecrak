SELECT answer_text, answer_check
FROM answer_table 
WHERE question_id = $1 AND answer_check = true