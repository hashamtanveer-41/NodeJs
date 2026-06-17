const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const mongoose = require("mongoose")

const app = express();
const PORT = 8000;

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(()=>"MongoDb connected successfully!")
    .catch((error)=>console.log(error))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
}, {timestamps: true})
const User = mongoose.model("user", userSchema)


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next)=>{
    fs.appendFile("log.txt", `\n ${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err, data)=>{
        next()
    })
})

app.get("/users", async (req, res ) => {
    const allDbUsers = await User.find({})
    const html = `
        <ul>
            ${allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
        </ul>
    `;
    return res.send(html)
})
app.get("/api/users", async (req, res ) => {
    const allDbUsers = await User.find({})

    return res.json(allDbUsers)
})

app.post("/api/users", async (req, res)=> {
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
    return res.status(201).json({msg: "success"})
})

app.route("/api/users/:id")
    .get(async (req, res ) => {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({error: "User not found"})
        return res.json(user)
    })
    .patch(async (req, res)=> {
        await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
        return res.json({status: "Success"})
    })
    .delete(async (req, res)=> {
        await User.findByIdAndDelete(req.params.id)
        return res.json(({status: "deleted"}));
    })

app.listen(PORT, ()=>console.log("Server Started successfully on port "+PORT))