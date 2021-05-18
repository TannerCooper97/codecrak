const initialState = {
  username: "",
  profilePic: "",
  aboutMe: "",
  highscore: 0,
  highscores: [],
  currentHighScore: 0,
  message: ''
};

const UPDATE_USER = "UPDATE_USER";
const GET_USER = 'GET_USER';
const GET_ALL_HIGHSCORES = "GET_ALL_HIGHSCORES";
const LOGOUT = "LOGOUT";
const UPDATE_CURRENT_HIGHSCORE = "UPDATE_CURRENT_HIGHSCORE";
const UPDATE_USERS_HIGHSCORE = "UPDATE_USERS_HIGHSCORE";
const UPDATE_USER_ABOUT_ME = "UPDATE_USER_ABOUT_ME";
const UPDATE_USER_PROFILE_PIC = "UPDATE_USER_PROFILE_PIC";

export default function (state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    // case UPDATE_USER + "_PENDING":
    //   return { ...state, isLoading: true };
    case GET_USER:
            return {...state, user: payload}
    case UPDATE_USER + "_FULFILLED":
      return {
        ...state,
        loginFailed: payload.loginFailed,
        username: payload.username,
        profilePic: payload.profilePic,
        aboutMe: payload.aboutMe,
        highscore: payload.highscore,
        isLoading: false,
      };
    case UPDATE_USER_ABOUT_ME + "_FULLFILLED":
      return{
        ...state,
        aboutMe: payload
      };
    case UPDATE_USER_PROFILE_PIC + "_FULLFILLED":
      return{
        ...state,
        profilePic: payload
      }
    case GET_ALL_HIGHSCORES + "_PENDING":
      return { ...state, isLoading: true };
    case GET_ALL_HIGHSCORES + "_FULFILLED":
      return {
        ...state,
        highscores: payload
      };
    case UPDATE_USERS_HIGHSCORE + "_FULLFILLED":
      return{
        ...state,
        highscore: payload
      };
    case UPDATE_CURRENT_HIGHSCORE:
      return{
        ...state,
        currentHighScore: payload
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
      
  }
}

export function getUser(payload){
  return{
      type: GET_USER,
      payload: payload
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function getAllHighscores(highscores){
  return{
    type: GET_ALL_HIGHSCORES,
    payload: highscores
  }
}

export function logoutUser() {
  console.log('Got Here')
  return {
    type: LOGOUT,
  };
}

export function updateUserProfilePic(profilePic){
  return{
    type: UPDATE_USER_PROFILE_PIC + "_FULLFILLED",
    payload: profilePic,
  }
}

export function updateUserAboutMe(aboutMe){
  return{
    type: UPDATE_USER_ABOUT_ME + "_FULLFILLED",
    payload: aboutMe,
  }
}

export function updateUserHighscore(currentHighScore){
  return{
  type: UPDATE_USERS_HIGHSCORE,
  payload: currentHighScore,
  }
}

export function updateUserCurrentHighscore(currentHighScore){
  return{
    type: UPDATE_CURRENT_HIGHSCORE,
    payload: currentHighScore
  }
}