const express = require('express');
const server=express();
const cors = require('cors');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/loginsignup');
    console.log('db connected')
}
const loginSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Phonenumber: Number,
    Email: String,
    Username: String ,
    Password: String,
})
const Login = mongoose.model('Login',loginSchema);


server.use(cors());
server.use(bodyParser.json());

server.post('/',async(req,res)=>{
    console.log(req.body)
    // console.log("kkkkkk")
    let user= await Login.findOne(req.body)
    console.log(user);
    if(user){
        res.status(200).send(true)
    }
    else{
        res.status(500).send(false)
    }
})

server.post('/demo',async(req,res)=>{
    let login = new Login();
    login.Firstname = req.body.Firstname;
    login.Lastname = req.body.Lastname;
    login.Phonenumber = req.body.Phonenumber;
    login.Email = req.body.Email;
    login.Username=req.body.Username;
    login.Password = req.body.Password;
    const doc= await login.save()
    console.log(doc)
    console.log(req.body)
    res.json(req.body);
})
server.listen(8080,()=>{
    console.log('server started')
})