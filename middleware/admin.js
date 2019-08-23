module.exports = function (req, res, next) {
    if (req.member.isAdmin) next();
    else {
        res.header({ 'Access-Control-Allow-Origin': 'https://daniascienceclub.ml', 'Access-Control-Allow-Credentials': 'true' }).status(403).send('<br><br><br><h1 color="dodgerblue">You are not an admin.</h1>');
    }
}