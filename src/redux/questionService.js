import store from './store';
import axios from 'axios';
import { getQuestion } from './questionReducer';

export function getQuestionDispatch (questionType) {
    let promise = axios.get(`/api/question?type=${questionType}`).then(res => res.data)
    store.dispatch(getQuestion(promise))
    
}

export function clearQuestionDispatch (questionData){
    store.dispatch(clearQuestion(questionData))
}