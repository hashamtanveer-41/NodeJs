const {getUser} = require("../service/auth");


function checkForAuthentication(req, res, next){
    const tokkenCookie =req.cookies?.token;
    req.user= null;
    if (!tokkenCookie){
        return next();
    }
    const token = tokkenCookie;
    const user = getUser(token)
    req.user = user;
    next();
}
function restrictTo(roles=[]){
    return function (req, res, next) {
        if (!req.user)return res.redirect("/login");
        if(!roles.includes(req.user.roles))return res.end("UnAuthorized")
        next();
    }

}
module.exports = {
    checkForAuthentication,restrictTo
}