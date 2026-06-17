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
})
const User = mongoose.model("user", userSchema)


app.use(express.urlencoded({extended: false}))

app.use((req, res, next)=>{
    fs.appendFile("log.txt", `\n ${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err, data)=>{
        next()
    })
})

app.get("/api/users", (req, res ) => {
    return res.json(users)
})

app.post("/api/users", async (req, res)=> {
    const body = req.body;
    if (!body || !body.first_name || !body.email || !body.gender || !body.job_title || !body.lastname_name ){
        return res.status(400).json({msg: "All fields are required"})
    }
    users.push({...body, id:users.length+1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.status(201).json(({status: "success", id: users.length}));
    })
})

app.route("/api/users/:id")
    .get((req, res ) => {
        const id =Number(req.params.id);
        const user = users.find((user) => user.id === id)
        if(!user || Object.keys(user).length === 0) return res.status(404).json({error: "User not found"})
        return res.json(user)
    })
    .patch((req, res)=> {
        const id =Number(req.params.id);
        const body = req.body;
        let user = users.find((user) => user.id === id)
        user = body;
        users.find((user) => user[id] === id)
        return res.json({status: "Pending"})
    })
    .delete((req, res)=> {
        const id =Number(req.params.id);
        const users1 = users.filter((user)=>user.id!==id)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users1), (err, data)=>{
            return res.json(({status: "deleted", id: id}));
        })
    })

app.listen(PORT, ()=>console.log("Server Started successfully on port "+PORT))