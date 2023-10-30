const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require("./models/users")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/login");

app.post("/signup", (req,res)=>{
    UserModel.create(req.body)
    .then(User => res.json(User))
    .catch(err => res.json(err))
})

app.post("/login", (req,res)=>{
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("Password is incorrect")
            }
        }
        else{
            res.json("No record exists")
        }
    })
})

app.listen(7003, ()=>{
    console.log("server is running");
})