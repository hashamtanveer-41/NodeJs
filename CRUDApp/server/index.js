import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/Users.js";

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/CRUD-App",)

app.get("/", (req, res)=>{
    UserModel.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post("/createUser", (req, res)=>{
UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res)=>{
    const id = req.params.id;
    UserModel.findById(id)
        .then(users => res.json(users))
        .catch(err => res.json(err));

})

app.put("/updateUser/:id", (req, res)=>{
    const id = req.params.id;
    UserModel
        .findByIdAndUpdate
            ({_id: id},
            {name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
            )
        .then(result => res.json(result))
        .catch(err=>res.json(err))
})
app.delete("/:id", (req, res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err=>res.json(err))
})
app.listen(3000, ()=>{
    console.log("Server Started on the Port 3000")
})