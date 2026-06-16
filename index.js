const http =require("http")
const fs = require("fs");
const uri = require("url")

const myServer = http.createServer((req ,res)=>{
    if (req.url === "/favicon.ico")return res.end()
    const log = `${Date.now()}: ${req.method} ${req.url} New request received \n `
    console.log(uri.Url)
    fs.appendFile("log.txt",log, (err, data) =>{
        res.end("Req at "+ req.url)
    })
});

myServer.listen(8000, ()=> console.log("Server Started"))