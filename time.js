const express = require('express');
const server=express();
const cors = require('cors');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/time');
    console.log('db connected')
}
server.use(cors());
server.use(bodyParser.json());
const contentSchema = new mongoose.Schema({
  description: String
})
const Content = mongoose.model('Content',contentSchema);

server.post('/time',async(req,res)=>{
  res.json(req.body);
  let content = new Content();
    console.log(req.body)
    const {spawn}= require('child_process');
        const childPython =spawn('python',['timeandweather.py',req.body.country,req.body.city]);
        childPython.stdout.on('data',(data)=>{
          const resp=data.toString();
          content.description=resp;
          const doc=content.save();
          console.log(doc)
          // res.send(resp);
        });
        childPython.stderr.on('data',(data)=>{
          const r=data.toString();
          console.log(r);
        });
        childPython.on('close',(code)=>{
          console.log((code))
        })
})
server.post('/data',async(res,req)=>{
  let user= await Content.findOne()
    console.log(user);
    if(user){
        res.status(200).send(true)
    }
    else{
        res.status(500).send(false)
    }
})
server.listen(8086,()=>{
    console.log('server started')
})