require("dotenv").config()
const express = require("express")
const path = require("path");
const app = express();
const PORT = process.env.PORT ||8000;
const mongoose = require("mongoose")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const cookieParser = require("cookie-parser")
const {checkForAuthenticationCookie} = require("./middleware/authentication");

app.set('view engine', "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.resolve("./public")))
const Blog = require("./models/blog")

app.use(checkForAuthenticationCookie("token"))
mongoose.connect(process.env.MONGO_URL).then((e)=>console.log("MongoDb connected"))

app.get("/", async (req, res)=>{
    const allBlogs = await Blog.find({});
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, ()=>console.log("Server started on PORT "+PORT))