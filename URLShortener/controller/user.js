const user = require("../models/users")
const {v4: uuidV4} = require("uuid")
const {getUser, setUser} = require("../service/auth")
const {response} = require("express");
async function handleUserSingUp(req, res){
    const {name, email, password}= req.body;
    await user.create({
        name, email, password
    });
    return res.render("home")
}
async function handleUserLogin(req, res){
    const {email, password}= req.body;
    const user1 = await user.findOne({
        email, password
    });
    if (!user1)return res.render("login", {
        error: "Invalid username or password."
    })

    const token = setUser(user1);
    // res.cookie('uid', token);
    return res.json({token})
}

module.exports = {
    handleUserSingUp,
    handleUserLogin
}