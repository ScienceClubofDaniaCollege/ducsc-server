const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(403).send('No token provided');
    try {
        const decoded = jwt.verify(token, 'pk');
        req.member = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid Token');
    }
}

exports.auth = auth;