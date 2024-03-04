const express = require('express');
const server=express();
const cors = require('cors');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/otpvalidationsbyphone');
    console.log('db connected')
}
const OnetpSchema = new mongoose.Schema({
    OTP:Number,
    phonenum:Number,
})
const ONETP = mongoose.model('ONETP',OnetpSchema);


server.use(cors());
server.use(bodyParser.json());

server.post('/',async(req,res)=>{
    console.log(req.body)
    // console.log("kkkkkk")
    let user= await ONETP.findOne(req.body)
    // let x=user.OTP;
    // console.log(x);
    // console.log(user.phonenum);
    // console.log(user);
    if(user){
        let user2=await ONETP.findOneAndDelete(req.body)
        console.log(user2);
        // const {spawn}= require('child_process');
        // // const childPython =spawn('python',['--version']);
        // const childPython =spawn('python',['fg.py',x]);
        // childPython.stdout.on('data',(data)=>{
        //   const res=data.toString();
        //   console.log(res);
        // });
        // childPython.stderr.on('data',(data)=>{
        //   console.log('stderr: $(data)');
        // });
        // childPython.on('close',(code)=>{
        //   console.log((code))
        // })
        res.status(200).send(true)
    }
    else{
        res.status(500).send(false)
    }
})

server.post('/otp',async(req,res)=>{
    let Onetp = new ONETP();
    Onetp.OTP= Math.floor(Math.random()*(9999-1000+1)+1000);
    Onetp.emaill=req.body.phonenum;
    const doc= await Onetp.save()
    console.log(doc)
    console.log(req.body)
    const {spawn}= require('child_process');
        // const childPython =spawn('python',['--version']);
        const childPython =spawn('python',['gf.py',Onetp.OTP,req.body.phonenum]);
        childPython.stdout.on('data',(data)=>{
          const res=data.toString();
          console.log(res);
        });
        childPython.stderr.on('data',(data)=>{
          console.log('stderr: $(data)');
        });
        childPython.on('close',(code)=>{
          console.log((code))
        })
    res.json(req.body);
})

server.listen(8082,()=>{
    console.log('server started')
})