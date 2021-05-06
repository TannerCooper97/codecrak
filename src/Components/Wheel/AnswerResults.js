import React, { useEffect, useState } from "react";
import './AnswerResults.css';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import {updateUserHighscoreDispatch} from '../../redux/userService';
import {updateUserCurrentHighscoreDispatch} from '../../redux/userService';
import {clearQuestionDispatch} from '../../redux/questionService';

 function checkAnswer(props){

    //takes the boolan value of true or false
    console.log( props.answerCheck)

    const {highscore} = useSelector((state) => state.users.highscore)
    const {currentHighScore} = useSelector((state) => state.users.currentHighScore)
    
    
    const {correctAnswer} = useSelector((state) => state.questions)
    const {answer_text} = correctAnswer
    
   
    console.log(currentHighScore)
    //checks if the answer == true or false either +50 or setting back to 0 for current highscore
   useEffect(() => {
    if(props.answerCheck === true){
            let correctScore = (currentHighScore + 50)
            console.log(correctScore)
        updateUserCurrentHighscoreDispatch(correctScore)
        return currentHighScore
    } else if(props.answerCheck === false){
            let incorrectScore = (currentHighScore + 50)
        updateUserCurrentHighscoreDispatch(incorrectScore)
     
    }
}, [])



    //checks to see if currentHighscore is above their overall highscore
    if(currentHighScore > highscore){
        useEffect(() => {
            updateUserHighscoreDispatch(highscore)
        }, [])
        return beatHighscore;
    }

    //create a function to clear questions *cries
    
    

    return(
        <div className="AnswerResultsPage">
            <h1 id="CorrectIncorrect">Correct</h1>
            <h3 id="Answer">The correct answer was:</h3>
            <p id='CorrectAnswer'>{answer_text}</p>
            <p id='currentScore'>Your Current Score: 250{currentHighScore}</p>
            <p id='endmessage'>Click Back to go back, Click continue to keep going!</p>
            <Link to= '/home'><button class='AnswerCheckButtonz'>Back</button></Link>
            <Link to= '/Wheel'><button class='AnswerCheckButtonz'>Continue</button></Link>
        </div>
    )
}
export default checkAnswer;