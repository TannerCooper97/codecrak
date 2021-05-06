module.exports = {
    getQuestion: async (req, res) => {
        //get type of question
        const {type} = req.query;
        //get database
        const db = req.app.get('db');
        
        //get all questions from database and put into array
        const idResults = await db.questions.get_array_of_questions_id_type(type);
        
        //get random number within the idResults array
        const randomNumber = Math.floor(Math.random() * idResults.length)
        // console.log('idresults', idResults)
        // console.log('randomNumber', randomNumber)

        //set that random number to a varible
        const randomId = idResults[randomNumber];
        // console.log('randomId', randomId.question_id)
        
        
        //get the question according to the random generated id index
        const [randomQuestion] = await db.questions.get_random_question(randomId.question_id);
        // console.log(randomQuestion);
        const answers = await db.questions.get_random_answers(randomId.question_id);
        console.log(answers);

        const [correctAnswer] = await db.questions.get_correct_answers(randomId.question_id)

        //set question and answers to its own object
        const questionGiven = {...randomQuestion,  answers, correctAnswer};
       
        // console.log('randomquestion', randomQuestion)
        // console.log('Question given' , questionGiven)

      

        //return the question
        return res.status(200).send(questionGiven);
    }
}