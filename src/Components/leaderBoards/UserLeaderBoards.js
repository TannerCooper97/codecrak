import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {connect, useSelector} from 'react-redux';
import {getAllHighscoresDispatch} from '../../redux/userService'


function UserLeaderBoards() {

    useEffect( () => {
        getAllHighscoresDispatch()
    }, [])

    const highscoreData = useSelector((state) => state.users.highscores);


    let listOfHighscores = highscoreData.map((score, i) => {return <li key= {i}>{`${score.username} : ${score.highscore}`}</li>})

    return(
        
        <div className="LeaderBoards">
        <h4 class='textColor'>Leader Boards:</h4>

        <ul class='textColor' id='list'>
           {listOfHighscores} 
        </ul>

        </div>
    )
}


export default UserLeaderBoards;