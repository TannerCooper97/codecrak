const initialState = {
    questionType: '',
    questionID: 0,
    questionText: '',
    answers: []
    
}

const GET_PLAY_QUESTION = 'GET_PLAY_QUESTION';
const CLEAR_PLAY_QUESTION= 'CLEAR_PLAY_QUESTION';


export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case GET_PLAY_QUESTION + '_PENIDING':
        return { ...state};
      case GET_PLAY_QUESTION + '_FULFILLED':
      console.log(payload)
        return {
          ...state,
          questionType: payload.question_type,
          questionID: payload.question_id,
          questionText: payload.question_text,
          answers: payload.answers,
          correctAnswer: payload.correctAnswer,
        }
        ;
      case CLEAR_PLAY_QUESTION:
        return{
          initialState,
        };
      default:
        return state;
    }
  }
  
  export function getQuestion(questionData) {
    return {
      type: GET_PLAY_QUESTION,
      payload: questionData,
      
    };
  }

  export function clearQuestion(questionData){
    return{
      type: CLEAR_PLAY_QUESTION,
      payload: questionData,
    }
  }