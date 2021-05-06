const bcrypt = require('bcrypt');

//This will allow a user to reigister, create their profile,
//login, logout, and get the current user(during session).

module.exports = {

    //Register a new user
    register:async (req, res) => {
        //get username, and pass off req.body
        const {username, password } = req.body;
        //get database
        const db = req.app.get('db');
        //set var to find the username through SQLfile
        const result = await db.auth.find_user_by_username([username]);
        //set an existinguser to the first result
        const existinguser = result[0];
        //Check if it is an existing user
        if(existinguser){
            return res.status(409).send('User already exists');
        }
        //Salt and hash users password
        const salt = bcrypt.genSaltSync(10);
        
        
        const hash = bcrypt.hashSync(password, salt);
        //Set newly created user to a registered user
        const registeredUser = await db.auth.create_user([username, hash, `https://robohash.org/${username}`, 'Change your about_me', 0]); //**
        //Set current user to registered user
        const user = registeredUser[0];

        //Current user session is what is accessed
        req.session.user = { id: user.user_id, username: user.username};
        return res.status(201).send(req.session.user);
    },

    //Create newly registered users profile
    profileCreation: async (req, res) => {
        //get username off req.body
        const {username} = req.body;
        //get database
        const db = req.app.get('db');
        //find current user
        const {id} = req.session.user;
        //check to see if it is current user
        if(!id){
            return res.sendStatus(403);
        }
        //Set variable to "post" a new user profile
        const profileCreate = await db.auth.create_new_profile([username, `https://robohash.org/${username}.png`, 'Insert your about me here', 0])
        return res.status(200).send(profileCreate);
    },

    profilePicUpdate: async (req, res) => {
        //get profile items off req.body
        const { profilepic } = req.body;
        //get database
        const db = req.app.get('db');
        //find current user
        const {id} = req.session.user;
        //check if current user
        if(!id){
            return res.sendStatus(403);
        }
        //Allow user to update profile picture
        const profilePicUpdate = await db.auth.update_profile_picture([id, profilepic]);

        return res.status(200).send(profilePicUpdate);
    },

    profileAboutMeUpdate: async (req, res) => {
        //get profile items off req.body
        const { aboutMe } = req.body;
        //get database
        const db = req.app.get('db');
        //find current user
        const {id} = req.session.user;
        //check if current user
        if(!id){
            return res.sendStatus(403);
        }
        //Allow user to update about me
        const profileAboutUpdate = await db.auth.update_profile_about_me([id, aboutMe]);

        return res.status(200).send([profileAboutUpdate]);
    },


    //Login user
    login:async (req, res) => {
        //Get username and password off req.body
        const {username, password } = req.body;
        //Set new found user to teh user searched through SQL file
        const userFound = await req.app.get('db').auth.find_user_by_username([username]);
        //set user to the newly found user

        const user = userFound[0];
        //If it is not the correct user login, tell to either register or try again.
        if(!user){
            return res.status(401).send('User not found. Please remeber to register before logging in.')
        }
        //Compare password to the users.hashed password
        const isAuthenticated = bcrypt.compareSync(password, user.password);

        if(!isAuthenticated){
            
            return res.status(403).send('Incorrect username or password.')
            
        }
        //Set current user session to logged in user
        
        req.session.user = {id: user.user_id, username: user.username, profilePic: user.profile_pic, aboutMe: user.about_me, highscore: user.highscore};
        return res.send(req.session.user);
    },

    //Logout user
    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    },

    getUser: (req, res) => {
       //If the session is not null, continue to use session.
       if(req.session.user !== null){
           return res.send(req.session.user);
       }else{
           //otherwise terminate session
           res.status(404).send('No user logged within current session');
       }

    }
}