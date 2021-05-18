require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authCtrl = require('./controllers/auth');
const questCtrl = require('./controllers/questions');
const scoreCtrl = require('./controllers/highScore');
const socket = require('socket.io');
const path = require('path')

const PORT = process.env.SERVER_PORT || 3000;
const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express(),
  io = socket(
    app.listen(PORT, () =>
      console.log(`Houston we have lift off on port ${PORT}`)
    )
  );


  io.on('connection', socket => {
    console.log('user connected')
    socket.on('message sent', data => {
      console.log(data)
      io.emit('message dispatched', data)
    })

    // socket.on('join room', data => {
    //   console.log('room joined', data.room)
    //   socket.join(data.room)
    //   io.to(data.room).emit('room joined')
    // })
    // socket.on('message sent', data => {
    //   io.to(data.room).emit('message dispatched', data.message)
    // })

    // socket.on('disconnect', () => {
    //   console.log('user disconnected')
    // })

  })

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, //One Hour
    },
  })
);

//Auth Endpoints
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.get('/api/auth/getuser', authCtrl.getUser);
app.post('/api/auth/logout', authCtrl.logout);
app.put('auth/profilePicUpdate', authCtrl.profilePicUpdate);
app.put('/api/auth/aboutMeUpdate', authCtrl.profileAboutMeUpdate);

//Question Endpoint
app.get('/api/question', questCtrl.getQuestion);

//Highscore Endpoints
app.get('/api/highScore', scoreCtrl.getHighscore);
app.put('/api/updateHighScore', scoreCtrl.updateHighscore);
app.get('/api/getAllHighScores', scoreCtrl.getAllHighscores);

app.use(express.static(__dirname + '/../build'));
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '../build/index.html'))
})

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
.then(dbInstance => {
  app.set("db", dbInstance);
})
.catch(err => console.log(err));
