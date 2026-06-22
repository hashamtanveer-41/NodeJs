import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import {TODOS} from "./todo.js";
import {USERS} from "./user.js";

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        resolvers: {
            Todo:{
                user:
                    (todo) => USERS.find((e)=> e.id == todo.userId),
            },
            Query: {
                getTodos:  () => TODOS,
                getAllUsers:  () => USERS,
                getUser: (parent, {id}) =>USERS.find((e)=> e.id == id)
            }
        },
        typeDefs: `
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }
            type Todo {
                id: ID!
                userId: String!
                title: String!
                completed: Boolean
                user: User
            }
            
            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!):User 
            }
        `
    });

    await server.start();
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server Started on port 8000"));
}

startServer();