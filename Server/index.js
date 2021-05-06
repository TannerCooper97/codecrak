require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authCtrl = require('./controllers/auth');
const questCtrl = require('./controllers/questions');
const scoreCtrl = require('./controllers/highScore');

const PORT = process.env.SERVER_PORT || 3000;
const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

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
app.put('/api/auth/profilePicUpdate', authCtrl.profilePicUpdate);
app.put('/api/auth/aboutMeUpdate', authCtrl.profileAboutMeUpdate);

//Question Endpoint
app.get('/api/question', questCtrl.getQuestion);

//Highscore Endpoints
app.get('/api/highScore', scoreCtrl.getHighscore);
app.put('/api/updateHighScore', scoreCtrl.updateHighscore);
app.get('/api/getAllHighScores', scoreCtrl.getAllHighscores);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    app.listen(PORT, () =>
      console.log(`DB Connected, Listing with all my heart on port: ${PORT}!`)
    );
  })
  .catch((err) => console.log(err));
