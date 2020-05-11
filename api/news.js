const router = require('express').Router();
const User = require('../models/User');
const News = require('../models/News');
const validate = require('../validate');
const token = require('./verify');

router.post('/create', async (req, res) => {
    // Validate the request
    const {error} = validate.news(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Verify the API-token
    const uid = token.verify(req.cookies.token);
    if (!uid) return res.status(403).send('{ "err": "Inte tillåtet! Se till att ha en duglig API-token." }');

    // Check if the user who executes the command is a student, if so -> respond with access denied.
    const user = await User.findOne({ _id: uid });
    if (user.title == "student") return res.status(403).send('Du har inte behörighet!')

    const sender = await User.findOne({ _id: uid });
    const date = new Date
    const dateNow = `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth() + 1} ${date.getFullYear()}`

    const news = new News({
        title: req.body.title,
        content: req.body.content,
        sender: sender.name,
        date: dateNow
    });
    try {
        const savedNews = await news.save();
        res.redirect('back')
    } catch(err) {
        console.log(err);
        res.send('Ett fel uppstod när nyheten skulle sparas.')
    }
});
router.get('/fetchAll', async (req, res) => {
    console.log('Laddar in alla nyheter...')
    const newsInDB = await News.find({});
    let newsMap = {};
    newsInDB.forEach( (news) => {
        newsMap[news._id] = news; 
    });
    console.log('Skickar ut nyheter!')
    res.json(newsMap);
});

module.exports = router;