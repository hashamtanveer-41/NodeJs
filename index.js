const http =require("http")
const fs = require("fs");

const myServer = http.createServer((req ,res)=>{
    const log = `${Date.now()}: ${req.url} New request received \n `
    fs.appendFile("log.txt",log, (err, data) =>{
        res.end("Req at ", req.url)
    })
});

myServer.listen(8000, ()=> console.log("Server Started"))