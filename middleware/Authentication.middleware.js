const jwt = require("jsonwebtoken");

const Authentication  = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, userId } = decoded;
        req.email = email;
        req.userId = userId
        next();
    } catch(err) {
        next("You don't have access to this! ");
    }
};

module.exports = Authentication;