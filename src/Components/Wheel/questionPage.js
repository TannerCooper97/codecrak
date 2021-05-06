import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuestionDispatch } from "../../redux/questionService";
import "./questionPage.css";
import AnswerResults from './AnswerResults';

function questionPage(props) {

  const [isFinished, setIsfinished] = useState(false);
  const [answerCheck, setanswerCheck] = useState();

  

  const { questionProp } = props.match.params;

  const lower = questionProp.toLowerCase();
  // console.log(lower);

  function buttonAnswer(value1, value2){
    setIsfinished(value1)
    setanswerCheck(value2)
  }


  useEffect(() => {
    getQuestionDispatch(lower);
  }, []);

  const questionData = useSelector((state) => state.questions);

  const { questionID, questionType, questionText, answers } = questionData;

  if (!questionID) {
  return <p>Loading...</p>;
  }

  if(isFinished){
    return <AnswerResults answerCheck={answerCheck}/>
  }

  return (
    <div className="QPage">
      <h1 className="questionTypeHeader">{questionProp}</h1>
      <p class='questionTextColor'>{questionText}</p>
      <ul>
        <div class='AnswerBox'>
          <p class='AnswerTextColor'>{answers[0].answer_text}</p>
          <button class='AnswerButtonz' onClick={() => buttonAnswer(true, answers[0].answer_check)}>A</button>
        </div>

        <div class='AnswerBox'>
          <p class='AnswerTextColor'>{answers[1].answer_text}</p>
          <button class='AnswerButtonz' onClick={() => buttonAnswer(true, answers[1].answer_check)}>B</button>
        </div>

        <div class='AnswerBox'>
          <p class='AnswerTextColor'>{answers[2].answer_text}</p>
          <button class='AnswerButtonz' onClick={() => buttonAnswer(true, answers[2].answer_check)} >C</button>
        </div>

        <div class='AnswerBox'>
          <p class='AnswerTextColor'>{answers[3].answer_text}</p>
          <button class='AnswerButtonz' onClick={() => buttonAnswer(true, answers[3].answer_check)}>D</button>
        </div>
      </ul>
    </div>
  );
}
export default questionPage;
