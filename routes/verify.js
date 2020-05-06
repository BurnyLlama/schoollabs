const jwt = require('jsonwebtoken');

module.exports.verify = (token) => {
    console.log('Ny anslutning...')
    if (!token) {
        console.log('Ingen token.')
        return false;
    }
    try {
        const verification = jwt.verify(token, process.env.TOKEN_SECRET);
        return verification._id;
    } catch(err) {
        return false;
    }
};
