const router = require('express').Router();
// A package to verify the tokens...
const verify = require('./verify')

router.get('/user', verify, (req,res) => {
    res.send('Only for private')
});

module.exports = router;