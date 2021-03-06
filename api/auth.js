const router = require('express').Router();
const User = require('../models/User');
const validate = require('../validate');
const bcrypt = require('bcrypt');
const token = require('./verify');
const jwt = require('jsonwebtoken');

// For admins to add users
router.post('/register', async (req, res) => {
    // Validate input with Joi
    let {error} = validate.register(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Verify the API-token
    const uid = token.verify(req.cookies.token);
    if (!uid) return res.status(403).send('{ "err": "Inte tillåtet! Se till att ha en duglig API-token." }');

    // Check if the user who executes the command really is an admin
    await User.findOne({ _id: uid }, (err, user) => {
        if (user.title != "admin") return res.status(403).send('Du är inte en admin!')
    });

    // Check if that username exists
    const userCheck = await User.findOne({ name: req.body.name });
    if (userCheck) return res.status(400).send('Den användaren finns redan!');
    
    // Hash password (Security 101)
    bcrypt.hash(req.body.pass, 10, async (err, passHash) => {
        // Construct new user
        const user = new User({
            name: req.body.name,
            pass: passHash,
            title: req.body.title,
            email: req.body.email
        });
        // Create new user, return error on bad request.
        try {
            console.log('Försöker registrera en ny anändare...')
            const savedUser = await user.save();
            console.log(`Registrerade ${req.body.name}`);
            res.send(savedUser);
        } catch(err) {
            res.status(400).send(err);
        }; 
    });
});

// When someone wants to login.
router.post('/login', async (req, res) => {
    // Log to console...
    console.log(`Inkommande förfrågan om att logga in som ${req.body.user}.`);

    // Validation
    const {error} = validate.login(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Check if that user exists
    const userFromDB = await User.findOne({ name: req.body.user });
    if (!userFromDB) return res.status(404).send({ err: 'Den användaren finns inte.' });

    // Check password
    bcrypt.compare(req.body.pass, userFromDB.pass, (err, match) => {
        // If a match
        if (match) {
            // Create and send a token
            const token = jwt.sign({ _id: userFromDB._id }, process.env.TOKEN_SECRET, {expiresIn: '3600s'}); // Put the TOKEN_SECRET varaible in '.env', ex: TOKEN_SECRET = supersecret
            console.log(token)

            // Send back a cookie (Yummy!) expires after a little more than 60 minutes.
            res.cookie('token', token, {expires: new Date(Date.now() + 4000000)});

            // Redirect to the hub (main area)...
            if (userFromDB.title == "admin") return res.redirect('/admin');
            if (userFromDB.title == "student") res.redirect('/hub');
            res.end();
        } else {
            res.status(403).send({ err: 'Fel lösenord!' });
        };
    });



});

// When someone wants to change password.
router.post('/forgot', (req, res, next) => {
    let user = req.body.user;
    console.log(`Inkommande förfrågan om att byta lösenord på ${user}.`);

    // Redirect the user and let them know you've gotten the request.
    res.redirect('/check_with_admin_if_need_help');
    res.end
});

module.exports = router;