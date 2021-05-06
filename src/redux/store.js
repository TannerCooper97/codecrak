import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import userReducer from './userReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers ({
    users: userReducer,
    questions: questionReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));