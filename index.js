const http =require("http")
const fs = require("fs");
const uri = require("url")
const express = require("express")

const app = express();
app.get("/", (req, res) => {
    return res.send("Hello From Home page")
})
app.get("/about", (req, res) => {
    return res.send("Hello From About page")
})

const myServer = http.createServer(app);

myServer.listen(8000, ()=> console.log("Server Started"))