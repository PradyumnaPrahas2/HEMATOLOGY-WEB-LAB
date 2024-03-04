const express = require('express');
const server=express();
const cors = require('cors');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/Student-database');
    console.log('db connected')
}
server.use(cors());
server.use(bodyParser.json());
const studentSchema = new mongoose.Schema({
  description: String
})
const feedbackschema= new mongoose.Schema({
    name:String,
    content:String,
})
const StudentData = mongoose.model('logindetails',studentSchema);
const FeedData= mongoose.model('Feedback',feedbackschema);
server.post('/feedbackdb',async(req,res)=>{
    let feeddata= new FeedData();
    feeddata.name=req.body.User;
    feeddata.content=req.body.Content;
    const doc= feeddata.save();
    console.log(doc);
})
server.post('/student-details',async(req,res)=>{
    console.log(req.body)
    console.log(req.body.username)
    console.log(req.body.password)
  let user= await StudentData.findOne({'ADMNO':req.body.password,'RNO':req.body.username})
    console.log(user);
    if(user){
        res.status(200).send(true)
    }
    else{
        res.status(500).send(false)
    }
})
server.listen(8087,()=>{
    console.log('server started')
})