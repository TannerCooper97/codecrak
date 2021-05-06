import React from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import UserLeaderBoards from '../leaderBoards/UserLeaderBoards';
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {logoutUserDispatch} from '../../redux/userService';

function home(){

    const currentUsername = useSelector((state) => state.users.username)

    if(!currentUsername){
        console.log('Redirecting');
        return <Redirect to={'/'}/>
    }
    return(
        <div className="Home">
            <body>

            <header id='LoginHeader' >CodeCrack</header>
            <h4 class='textColor'>Welcome, {currentUsername}</h4>

            
            <Link to='/profile/:id'><button id='homeButtonz' >Profile</button></Link>
            <br/>
            <Link to= '/'><button id='homeButtonz'>Logout</button></Link>

            <p class='textColor'>How far can you go?</p>
            <Link to='/wheel'><button id='playButton'>Play</button></Link>

            <UserLeaderBoards class='leaderboards' />

            </body>
            
        </div>
    )
} export default home;