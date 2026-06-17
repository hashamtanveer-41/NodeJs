const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}))

app.get("/api/users", (req, res ) => {
    return res.json(users)
})

app.post("/api/users", (req, res)=> {
    const body = req.body;
    users.push({...body, id:users.length+1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json(({status: "success", id: users.length}));
    })
})

app.route("/api/users/:id")
    .get((req, res ) => {
        const id =Number(req.params.id);
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })
    .patch((req, res)=> {
        const id =Number(req.params.id);
        const body = req.body;
        let user = users.find((user) => user.id === id)
        user = body;
        users.find((user) => user.id === id)
        return res.json({status: "Pending"})
    })
    .delete((req, res)=> {
        const id =Number(req.params.id);
        const users1 = users.filter((user)=>user.id!==id)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users1), (err, data)=>{
            return res.json(({status: "deleted", id: id}));
        })
    })

app.listen(PORT, ()=>console.log("Server Started successfully on port "+PORT))