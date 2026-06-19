const express = require("express")
const path = require("path");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose")
const userRoute = require("./routes/user")

app.set('view engine', "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: false}))
mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>console.log("MongoDb connected"))

app.get("/", (req, res)=>{
    return res.render("home")
})

app.use("/user", userRoute)

app.listen(PORT, ()=>console.log("Server started on PORT "+PORT))