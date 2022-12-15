const jwt = require('jsonwebtoken');

const middlwareController = {

    verifyToken: (req, res, next) =>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err,user) => {
                if(err){
                   return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } 
        else {
            return  res.status(401).json("You are not authenticated!");
        }
    },

    verifyTokenAndAuthorization: (req, res, next) =>{
        middlwareController.verifyToken(req, res, () => {
            if(req.user.id == req.params.id || req.user.admin){
                next();
            } else {
                res.status(403).json("You are not allowed to Delete")
            }
        })
    },

    verifyTokenJustAdminAuth: (req, res, next) =>{
        middlwareController.verifyToken(req, res, () => {
            if(req.user.admin){
                next();
            } else {
                res.status(403).json("You are not allowed to Do That!")
            }
        })
    },





}

module.exports = middlwareController;