const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.cookies.token;
    
    if (!token) return res.header({ 'Access-Control-Allow-Origin': 'https://ducsc.github.io', 'Access-Control-Allow-Credentials': 'true' }).status(403).redirect('/login');
    try {
        const decoded = jwt.verify(token, 'pk');
        req.member = decoded;
        next();
    }
    catch(ex) {
        res.header({ 'Access-Control-Allow-Origin': 'https://ducsc.github.io', 'Access-Control-Allow-Credentials': 'true' }).status(400).send('Invalid Token');
    }
}

exports.auth = auth;