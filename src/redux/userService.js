import store from './store';
import axios from 'axios';
import { getAllHighscores, updateUser, updateUserAboutMe, updateUserCurrentHighscore, updateUserHighscore } from './userReducer';

export function loginUserDispatch (username, password) {
    let promise = axios.post('/api/auth/login', {username, password}).then(res => res.data).catch(err => {return{loginFailed: true}})
    store.dispatch(updateUser(promise))
}

export function getAllHighscoresDispatch (){
   let promise = axios.get('/api/getAllHighScores').then(res => res.data)
   store.dispatch(getAllHighscores(promise))
}

export function updateUserProfilePicDispatch (profilePic){
    let promise = axios.put('/api/auth/profilePicUpdate').then(res => res.data)
    store.dispatch(updateUserProfilePic(promise))
}

export function updateUserAboutMeDispatch (aboutMe){
    let promise = axios.put('/api/auth/aboutMeUpdate').then(res => res.data)
    store.dispatch(updateUserAboutMe(promise))
}

export function updateUserHighscoreDispatch(highscore){
    let promise = axios.put('/api/updateHighScore').then(res => res.data)
    store.dispatch(updateUserHighscore(promise))
}

export function updateUserCurrentHighscoreDispatch(currentHighScore){
    store.dispatch(updateUserCurrentHighscore(currentHighScore))
}

//Reasons for Service files


//import store.dispatch
//export dispatch functions
//all actions are organized
//Evertime Redux needs to change its state, you can get it from here. 