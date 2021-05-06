import React, {useState} from 'react';
import './profile.css';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Editable from "./Editable";

function profile(){

    const {username, profilePic, aboutMe, highscore} = useSelector((state) => state.users)
    const wholeUser = useSelector((state) => state.users)

    // [aboutMe, setAboutme] = useState();

    function editAboutMe(){
        updateUserAboutMe(aboutMe);
    }
   
    return(
        <div className="Profile">
            <body>
            <h1 id='WelcomeHeader'> Welcome, {username} </h1>
            <img src={profilePic} alt={username} />
            <h3 class='TextColor'>About Me</h3>
            <p class='TextColor'>{aboutMe}</p>
            <p id='HighScoreColor'>High Score: {highscore}</p>
            <Link to= '/home' ><button id='homeButtonz'>Back</button></Link>
            </body>
        </div>
    )
}
export default profile;

{/* <button onClick={<Editable
      text={aboutMe}
      placeholder={aboutMe}
      type="input"
    >
      <input
        type="text"
        name="aboutme"
        placeholder="Write a task name"
        value={aboutMe}
        onChange={e => setAboutme(e.target.value)}
      />
    </Editable>} >Update AboutMe</button> */}