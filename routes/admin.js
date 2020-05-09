const router = require('express').Router();
const User = require('../models/User');
const validate = require('../validate');
const token = require('./verify');
const bcrypt = require('bcrypt')

router.post('/changePass', async (req, res) => {
    // Validate the request
    const {error} = validate.changePassAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Verify the API-token
    const uid = token.verify(req.cookies.token);
    if (!uid) return res.status(403).send('{ "err": "Inte tillåtet! Se till att ha en duglig API-token." }');

    // Check if the user who executes the command really is an admin
    const adminCheck = User.findOne({ _id: uid })
    if (!adminCheck) return res.status(403).send('Du är inte en admin!')
    
    // Check if the user exists
    let user = User.findOne({ name: req.body.user });
    if (!user) return res.status(400).send('Den användaren finns inte!');

    // Hash the new password
    bcrypt.hash(req.body.pass, 10, async (err, passHash) => {
        // Create new user, return error on bad request.
        try {
            // Set the pass to the new hash
            console.log('Byter lösenord på en användare...')
            await user.updateOne({ pass: passHash});
            console.log(`Bytte lösenord ${req.body.user}`);
            return res.send('Ok!');
        } catch(err) {
            return res.status(400).send(err);
        }; 
    });
});

module.exports = router;