// this is basically going to be used to protect routes 

const jwt = require('jsonwebtoken');
const JWT_SECRET = "MYNAME IS OMAKR";

exports.protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);
    if(!authHeader){
         return res.status(401).json({ message: 'No token provided, token dosent exist' });
    }
    if(!authHeader.startsWith('Bearer ')){
         return res.status(401).json({ message: 'No token provided, is invalid' });
    }

    const token = authHeader.split(' ')[1];

    try{
        const actualValue = jwt.verify(token, JWT_SECRET);
        req.user = actualValue;
        next();
    }
    catch(err){
        return res.status(403).json({message: 'Invalid token'});
    }
}

exports.restrictTo = (roles = []) => {
    return function(req, res, next) {
        if(!req.user) res.status(403).json({message: 'Unauthorized'});

        if(!roles.includes(req.user.role)) res.status(403).json({message: 'Unauthorized'});
        return next();

    };
}