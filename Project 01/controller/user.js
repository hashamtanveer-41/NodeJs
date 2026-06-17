const User = require("../model/user")

async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "User not found"})
    return res.json(user)
}

async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json({status: "Success"})
}
async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id)
    return res.json(({status: "deleted"}));
}
async function handleCreateUser(req, res){
    const body = req.body;
    console.log(body)
    if (!body || !body.firstName || !body.email || !body.gender || !body.job_title || !body.lastName ){
        return res.status(400).json({msg: "All fields are required"})
    }
    const result = await User.create({
        firstName: body.firstName,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
        lastName: body.lastName,
    })
    return res.status(201).json({msg: "success", id:result._id})
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}