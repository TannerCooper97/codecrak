import React from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import UserLeaderBoards from '../leaderBoards/UserLeaderBoards';
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ChatBox from './ChatBox';
import axios from 'axios';
import {logoutUserDispatch} from '../../redux/userService';
import {logoutUser} from '../../redux/userReducer';

function home(props){

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
            <button id='homeButtonz'>Logout</button>

            <p class='textColor'>How far can you go?</p>
            <Link to='/wheel'><button id='playButton'>Play</button></Link>

            <UserLeaderBoards class='leaderboards' />
            
            </body>
            <ChatBox/>
            
        </div>
    )
} const mapStateToProps = (stateRedux) => {
    return {
        user: stateRedux.users.user
    }
}

export default connect(mapStateToProps, {logoutUser})(home);