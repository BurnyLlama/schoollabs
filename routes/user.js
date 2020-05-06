const router = require('express').Router();
const token = require('./verify');
const User = require('../models/User');

router.post('/changeSettings', async (req, res) => {
    if (!req.body.theme) return 0;
    const uid = token.verify(req.cookies.token);
    //if (!uid) return res.status(403).send('{ "err": "Inte tillåtet! Se till att ha en duglig API-token." }');
    console.log(`Försöker byta tema på ${uid}`);
    let user = await User.findOne({ _id: uid });
    await user.updateOne({ theme: req.body.theme }) 

    res.redirect('/hub')
});

module.exports = router;