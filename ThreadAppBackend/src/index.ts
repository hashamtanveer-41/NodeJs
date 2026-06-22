// @ts-ignore
import express from "express";
// @ts-ignore
import {expressMiddleware} from "@as-integrations/express5";
import createApolloGraphqlServer from "./graphql/index.js";

async function init(){

    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    app.get("/", (req, res)=>{
        res.json({message: "Server is up and running" })
    })

    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));
    app.listen(PORT, ()=> console.log("Server is started on "+PORT))
}

init();