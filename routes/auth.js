const router = require('express').Router();
const User = require('../models/User');

// For admins to add users
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        pass: req.body.pass,
        title: req.body.title,
        email: req.body.email
    });
    try {
        console.log('Försöker registrera en ny anändare...')
        const savedUser = await user.save();
        console.log(`Registrerade ${savedUser}`);
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    };
});

// When someone wants to login.
router.post('/login', (req, res, next) => {
    let user = req.body.user;
    let pass = req.body.pass;
    console.log(`Inkommande förfrågan om att logga in som ${user}.`);

    req.session.loggedin = true;
    req.session.user = user;

    res.redirect('/hub');
    res.end();
});

// When someone wants to change password.
router.post('/forgot', (req, res, next) => {
    let user = req.body.user;
    console.log(`Inkommande förfrågan om att byta lösenord på ${user}.`);

    // Redirect the user and let them know you've gotten the request.
    res.redirect('/forgot_pass/check.html');
    res.end
});

// When the client checks if you should be at /hub
router.get('/hub', (req, res, next) => {
    if (req.session.loggedin) {
        res.send(`{"msg" : "Välkommen ${req.session.user}"}`);
    } else {
        res.send('{"msg" : "Vänligen logga in!"}');
    };
    res.end();
});

module.exports = router;