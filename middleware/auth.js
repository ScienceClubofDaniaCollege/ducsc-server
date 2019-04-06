const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.cookies.token;
    
    if (!token) return res.status(403).redirect('/login');
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