module.exports = {
    getHighscore: async(req, res) => {
  
        const db = req.app.get('db');

        //check is correct user
        if(!id){
            return res.status(403).send('You do not have access to this information.')
        }

        const result = await db.auth.get_user_highscore(highscore);
        return res.status(200).send(result);
    },

    updateHighscore: async(req, res) => {
        //get highscoreoff req.body
        const {highscore} = req.body;
        //get database
        const db = req.app.get('db');
        //get user
        const {id} = req.session.user;

        //check is correct user
        if(!id){
            return res.status(403).send('You do not have access to this, please leave. >:)')
        }

        const result = await db.auth.update_users_highscore([id, highscore]);
        return res.status(200).send(result);
    },

    getAllHighscores: async(req, res) => {
        //get database
        const db = req.app.get('db');

        const results = await db.auth.get_all_highscores([]);
        return res.status(200).send(results);

    }
}