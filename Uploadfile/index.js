const express = require("express")
const PORT = 8000
const app = express()
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, res, cb){
        return cb(null, './uploads')
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({storage})

app.set("view engine", "ejs")
app.set("views", path.resolve("./view"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get("/", (req, res) =>{
    return res.render("home")
})

app.post("/upload", upload.single("profileImage"),(req, res)=>{
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/")
})
app.listen(PORT, ()=>console.log("Server started on port "+PORT));