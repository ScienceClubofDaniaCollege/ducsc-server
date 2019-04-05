const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.cookies.token;
    
    if (!token) return res.status(403).send('<br><br><br><h1>Please <a href="/login">Login</a></h1>');
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