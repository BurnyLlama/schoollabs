const router = require('express').Router();
const token = require('./verify');
const User = require('../models/User');

router.get('/user', async (req,res) => {
    const uid = token.verify(req.cookies.token);
    if (!uid) res.status(403).send('{ "err": "Inte tillåtet! Se till att ha en duglig API-token." }');
    console.log(uid)
    const user = await User.findOne({ _id: uid });
    const userInfo = {
        name: user.name,
        title: user.title,
        email: user.email,
        theme: user.theme,
        schedules: user.schedules,
        subjects: user.subjects,
        calendar: user.calendar,
        groups: user.groups
    }
    res.json(userInfo)
});

module.exports = router;