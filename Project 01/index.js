const express = require("express")
const users = require("./MOCK_DATA.json")
const {connectMongoDb} = require("./connection")
const {logRequest} = require("./middlewares/index")
const app = express();
const PORT = 8000;

const userRouter = require("./routes/routes")
//Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>{
    console.log("Mongo Db connected Successfully")
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(logRequest("log.txt"))
app.use("/api/users", userRouter)
app.listen(PORT, ()=>console.log("Server Started successfully on port "+PORT))
