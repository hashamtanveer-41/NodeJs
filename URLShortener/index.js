const express = require("express")
const {connectMongoDb} = require("./connection")
const app = express();
const PORT = 8000;
const staticRoute = require("./routes/staticRouter")
const router = require("./routes/url")
const URL = require("./models/url")
const path = require("path");

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("Mongo Db connected Successfully")
})
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/url", router)
app.use("/", staticRoute)

app.get("/test", async (req, res)=>{
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls
    });
});

app.get("/url/:shortId",async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory: {
                    timeStamp: Date.now()
                }
            },
        }
        );
    res.redirect(entry.redirectUrl)
})
app.listen(PORT, ()=>console.log("Server Started successfully on port "+PORT))
