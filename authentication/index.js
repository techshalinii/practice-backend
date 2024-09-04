import express from "express";
import path from 'path';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

mongoose.connect("mongodb://localhost:27017", {
    dbName:"backend",
}).then(() => console.log("Database Connected")).catch(e => console.log(e));


/*const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
}); */
//const Message = mongoose.model("Message", messageSchema)

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: String
});

const User = mongoose.model("User", userSchema);

const app = express();

//const users=[];

//using middlewares
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//setting up view engine
app.set("view engine", "ejs");

const isAuthenticated = async (req,res, next) =>{
        const {token} = req.cookies;
        if(token){

            const decoded = jwt.verify(token, "sssss");
            req.user = await User.findById(decoded._id)
           next();
        }
        else{
            res.render("login");
        }
    
    };


/*app.get("/",(req, res)=>{
    res.render("index");
}); */

app.get("/",isAuthenticated, (req, res)=>{
    //console.log(req.user)
    res.render("logout", {name:req.user.name})
});

app.post('/login',(req,res)=>{
    res.render("login");
})

app.get("/register", (req, res)=>{
    //console.log(req.user)
    res.render("register")
});


app.post("/register", async(req, res) => {
    const{name, email, password} = req.body;

    let user = await User.findOne({email})
    if(user){
        return res.redirect("/login")
    }
    user = await User.create({
        name,
        email,
        password
    });
    const token = jwt.sign({_id: user._id},"sssss");

    res.cookie("token", token,{
        httpOnly:true,
        expires: new Date(Date.now() + 60*1000)
    });
    res.redirect("/");
})


app.get("/logout", (req, res) => {
    res.cookie("token","null",{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    res.redirect("/");
})





/*app.get("/add", async(req, res) =>{

   await Message.create({name:"Shalini kumari", email:"abc@gmail.com"})
        res.send("Nice");
});*/


 /*app.get("/success",(req, res)=>{
    res.render("success");
}); */


/*app.post("/contact", async(req, res)=>{
    //console.log(req.body);

    const {name, email} = req.body;
    await Message.create({name, email })

    // res.render("success")
    res.redirect("/success");
}); */



/*app.get("/users",(req, res)=>{
    res.json({
        users,
    });
}); */

app.listen(5000, () => {
    console.log("Server is working");
});