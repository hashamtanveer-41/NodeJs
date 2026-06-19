const jwt = require("jsonwebtoken")
const secret = "Adfa42341kasd-!@@!#"
function setUser ( user){
    return jwt.sign({
        id: user._id,
        email: user.email
    }, secret)
}

function getUser(token){
    if(!token)return  null;
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return null;
    }
}

module.exports = {
    setUser, getUser
}