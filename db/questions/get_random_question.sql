SELECT question_text, question_id, question_type
FROM question_table 
WHERE question_id = $1;