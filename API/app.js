import express from 'express';
import mongoose from 'mongoose'; 
import userRouter from "./routers/user.js"

const app = express();

//using middlewares
app.use(express.json());
app.use(userRouter);

mongoose.connect("mongodb://localhost:27017", {
    dbName:"backendapi"
}).then(() => console.log("Database Connected")).catch((e) => console.log(e));

 const schema = new mongoose.Schema({
     name:String,
    email:String,
    password:String
});


 const User = mongoose.model("User", schema)

app.get("/",(req, res) => {
    res.send("Working Fine")
});

 app.get("/users/all", async(req, res) =>{

    const users = await User.find({});
     console.log(req.query);

   const keyword = req.query.keyword;
    console.log(keyword);

     res.json({
         success:true,
         users
    });

});



 app.post("/users/new", async(req, res) =>{

    const {name, email, password} = req.body

         await User.create({
         name,
         email,
         password
     })

     res.status(201).cookie("temp","cookii").json({
        success:true,
         message:"Registerd Successfully"
     });
 });

 app.get("/userid/special",(req, res) =>{
     res.json({
         sucess: true,
         message:"fine"
     });
 });

 app.get("/userid/:id",async(req,res)=>{

     const {id }= req.params;
     const user = await User.findById(id);

     //console.log(req.params);

     res.json({
         success:true,
         user,
        
     });
 });

app.listen(4000,() =>{
    console.log("Server is working");
});