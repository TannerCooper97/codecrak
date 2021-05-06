import axios from 'axios';
import React, { useState } from 'react';
import { loginUserDispatch } from '../../redux/userService';
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom';
import './auth.css';

function Auth() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 function login(){
     loginUserDispatch(username, password);
 }

 function register(){
     axios.post('/api/auth/register', {username, password}).then(res => res.data).catch(err => err)
 }

const currentUsername = useSelector((state) => state.users.username)
const loginFailed = useSelector((state) => state.users.loginFailed)

if(currentUsername){
    return <Redirect to={'/home'}/>
}


    return(
        
        <div className="LoginPage">
        <body>
        <header id='LoginHeader'>  CodeCrack</header>
        <p id='welcome'>Please login to continue</p>
        
        <div id='loginSection'>
        <div id='username-Box'>
        <p class='loginfont'>Username:</p>
        <input class='input-box' value={username} type='text' onChange={e => setUsername(e.target.value)}/>
        </div>

        <div id='password-box'>
        <p class='loginfont'>Password:</p>
        <input class='input-box' value={password} type='password' onChange={e => setPassword(e.target.value)}/>
        </div>
        </div>

        <div id='ButtonBox'>
        <button class= 'Buttonz' onClick={login} >Login</button>
        {loginFailed && <p>Login Failed</p>}
        <button class= 'Buttonz' onClick={register}>Register</button>
        </div>

        </body>
        </div>
    )
}
export default Auth;
