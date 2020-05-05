const router = require('express').Router();
const User = require('../models/User');
const validate = require('../validate');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// For admins to add users
router.post('/register', async (req, res) => {
    // Validate input with Joi
    let {error} = validate.register(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if that username exists
    const userCheck = await User.findOne({ user: req.body.name });
    if (userCheck) return res.status(400).send('That user already exists!');
    
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
    })
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
            const token = jwt.sign({ _id: userFromDB._id }, process.env.TOKEN_SECRET); // Put the TOKEN_SECRET varaible in '.env', ex: TOKEN_SECRET = supersecret
            res.header('api-token', token).send(token);

            // Session variables
            req.session.loggedin = true;
            req.session.user = req.body.user;

            // Redirect to the hub (main area)...
            res.redirect('/hub');
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