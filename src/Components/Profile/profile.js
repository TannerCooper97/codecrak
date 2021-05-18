import React, {useState, useEffect} from 'react';
import './profile.css';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';


function profile(){

    const {username, profilePic, aboutMe, highscore} = useSelector((state) => state.users)
    const wholeUser = useSelector((state) => state.users)

    // [aboutMe, setAboutme] = useState();
    const [editView, setEditView] = useState(false)
    const [userInfo, setUserInfo] = useState(
      {
        aboutMe: wholeUser?.aboutMe
      }
    );

    useEffect(() => {
      if(wholeUser) {
        setUserInfo({
          aboutMe: wholeUser?.aboutMe
        })
      }
    }, [wholeUser])

    const handleChange = (e) => {
      console.log(wholeUser)
      setUserInfo({...wholeUser, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    setEditView(!editView)
    
    axios.put('auth/aboutMeUpdate', userInfo)
      .then(res => {
        updateUserAboutMe(res.data)
      })
      .catch(err => console.log(err))
    }
   
    return(
        <div className="Profile">
            <body>
            <h1 id='WelcomeHeader'> Welcome, {username} </h1>
            <img src={profilePic} alt={username} />
            <h3 className='TextColor'>About Me</h3>
            {editView ? <form onSubmit={handleSubmit}><input onChange={handleChange} name="about_me" placeholder={wholeUser?.aboutMe}/></form>: null}
            <p className='TextColor'>{aboutMe}</p>
            <button onClick={() => setEditView(!editView)} id='homeButtonz'>Edit About Me</button>
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