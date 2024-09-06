import express from 'express';
import userRouter from "./routers/user.js"
import {config} from "dotenv"

config({
    path:"./data/config.env"
})

export const app = express();


//using middlewares
app.use(express.json());
app.use("/users" ,userRouter);


 app.get("/",(req, res) => {
     res.send("Working Fine")
 });
