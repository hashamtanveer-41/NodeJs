const JWT = require("jsonwebtoken")

const secret = "@#$!$32asff"

function createTokenForUser (user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    return JWT.verify(token, secret);
}

module.exports = {
    createTokenForUser,
    validateToken
}