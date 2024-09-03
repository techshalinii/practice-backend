import express from "express";
import path from 'path';
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017", {
    dbName:"backend",
}).then(() => console.log("Database Connected")).catch(e => console.log(e));

const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
});

const Message = mongoose.model("Message", messageSchema)

const app = express();

const users=[];

//using middlewares
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));

//setting up view engine
app.set("view engine", "ejs");

app.get("/",(req, res)=>{
    res.render("index");
}); 

app.get("/add", async(req, res) =>{

   await Message.create({name:"Shalini kumari", email:"abc@gmail.com"})
        res.send("Nice");
});
 app.get("/success",(req, res)=>{
    res.render("success");
}); 

app.post("/",(req, res)=>{
    //console.log(req.body);
    users.push({username:req.body.name , email:req.body.email});

    // res.render("success")
    res.redirect("/success");
});

app.get("/users",(req, res)=>{
    res.json({
        users,
    });
});

app.listen(5000, () => {
    console.log("Server is working");
});