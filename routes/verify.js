const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header.api-token;
    if (!token) res.status(401).send({ err: 'Du behöver API-token.'});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch(err) {
        res.status(400).send({ err: 'Felaktig API-token' })
    }
};
