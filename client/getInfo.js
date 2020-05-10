const verifier = require('../api/verify');
const User = require('../models/User');

const getInfo = async (token) => {
    const uid = verifier.verify(token);
    if (!uid)
        return res.status(403).send('{ "err": "Inte tillåtet! Se till att ha en duglig API-token." }');
    console.log(uid);
    const user = await User.findOne({ _id: uid });
    const userInfo = {
        name: user.name,
        initial: user.name.charAt(0),
        title: user.title,
        email: user.email,
        theme: user.theme,
        schedules: user.schedules,
        subjects: user.subjects,
        calendar: user.calendar,
        groups: user.groups
    };
    return userInfo;
}

exports.getInfo = getInfo;
