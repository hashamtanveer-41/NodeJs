const express = require("express")
const {connectMongoDb} = require("./connection")
const app = express();
const PORT = 8000;
const router = require("./routes/url")
const URL = require("./models/url")

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("Mongo Db connected Successfully")
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/url", router)
app.get("/:shortId",async (req, res)=>{
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
