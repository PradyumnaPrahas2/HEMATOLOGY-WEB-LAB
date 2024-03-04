const express = require('express');
const server=express();
const cors = require('cors');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/formdatabase');
    console.log('db connected formdata')
}
const formdataSchema = new mongoose.Schema({
    gender:String,
    hemoglobin:Number,
    mcv:Number,
    mch:Number,
    mchc:Number,
    Nameofthepatient:String,
    result:String,
    result2:String,
    Model:String,
    Gresult1:String,
    Gresult2:String,
})
const FormData = mongoose.model('Login1',formdataSchema);


server.use(cors());
server.use(bodyParser.json());

server.post('/',async(req,res)=>{
    // console.log("kkkkkk")
    console.log(req.body)
    let user= await FormData.findOne({'Nameofthepatient':req.body.Nameofthepatient,'Model':req.body.Model,'result':'ANEMIC\r\n'})
    console.log(user);
    if(user){
        res.status(200).json(true)
    }
    else{
        res.status(500).send(false)
    }
})
server.post('/gr',async(req,res)=>{
    // console.log("kkkkkk")
    console.log(req.body)
    let user= await FormData.findOne({'Nameofthepatient':req.body.Nameofthepatient,'Model':req.body.Model,'Gresult1':'ANEMIC\r\n'})
    console.log(user);
    if(user){
        res.status(200).json(true)
    }
    else{
        res.status(500).send(false)
    }
})
server.post('/gr2',async(req,res)=>{
    // console.log("kkkkkk")
    console.log(req.body)
    let user= await FormData.findOne({'Nameofthepatient':req.body.Nameofthepatient,'Model':req.body.Model,'Gresult2':'ANEMIC\r\n'})
    console.log(user);
    if(user){
        res.status(200).json(true)
    }
    else{
        res.status(500).send(false)
    }
})
server.post('/res2',async(req,res)=>{
    // console.log("kkkkkk")
    console.log(req.body)
    let user= await FormData.findOne({'Nameofthepatient':req.body.Nameofthepatient,'Model':req.body.Model,'result2':'ANEMIC\r\n'})
    console.log(user);
    if(user){
        res.status(200).json(true)
    }
    else{
        res.status(500).send(false)
    }
})

server.post('/formdatabase',async(req,res)=>{
    let formdata = new FormData();
    formdata.gender=req.body.Gender;
    formdata.hemoglobin = req.body.Hemoglobin;
    formdata.mcv = req.body.MCV;
    formdata.mch=req.body.MCH;
    formdata.mchc=req.body.MCHC;
    formdata.Nameofthepatient = req.body.Nameofthepatient;
    formdata.Model=req.body.Model;
    const {spawn}= require('child_process');
    const childPython =spawn('python',['naivebayes.py',req.body.Gender,req.body.Hemoglobin,req.body.MCH,req.body.MCHC,req.body.MCV,req.body.Model]);
    childPython.stdout.on('data',(data)=>{
        const res=data.toString();
        formdata.result = String(res);
        console.log(String(res));
        console.log(formdata);
        
    });
    childPython.stderr.on('data',(data)=>{
        const res=data.toString();
        console.log(res);
    });
    childPython.on('close',(code)=>{
        console.log((code))
    });
    const childPython2 =spawn('python',['naivebayes2.py',req.body.Hemoglobin,req.body.MCH,req.body.MCV,req.body.Model]);
    childPython2.stdout.on('data',(data)=>{
        const res=data.toString();
        formdata.result2 = String(res);
        console.log(String(res));
        console.log(formdata);
        
    });
    childPython2.stderr.on('data',(data)=>{
        const res=data.toString();
        console.log(res);
    });
    childPython2.on('close',(code)=>{
        console.log((code))
    });
    const childPython3 =spawn('python',['groundresult.py',req.body.Gender,req.body.Hemoglobin,req.body.MCH,req.body.MCHC,req.body.MCV,req.body.Model]);
    childPython3.stdout.on('data',(data)=>{
        const res=data.toString();
        formdata.Gresult1 = String(res);
        console.log(String(res));
        console.log(formdata);
        
    });
    childPython3.stderr.on('data',(data)=>{
        const res=data.toString();
        console.log(res);
    });
    childPython3.on('close',async(code)=>{
        console.log((code))
        const doc= await formdata.save()
        console.log('last final');

    });
    const childPython4 =spawn('python',['groundresult2.py',req.body.Hemoglobin,req.body.MCH,req.body.MCV,req.body.Model]);
    childPython4.stdout.on('data',(data)=>{
        const res=data.toString();
        formdata.Gresult2 = String(res);
        console.log(String(res));
        console.log(formdata);
        
    });
    childPython4.stderr.on('data',(data)=>{
        const res=data.toString();
        console.log(res);
    });
    childPython4.on('close',async(code)=>{
        console.log((code))
        // const doc= await formdata.save()
        console.log("final")
        console.log(formdata)
    });
    const childPython5 =spawn('python',['fla.py',req.body.Gender,req.body.Hemoglobin,req.body.MCH,req.body.MCHC,req.body.MCV]);
    childPython5.stdout.on('data',(data)=>{
        console.log("successfully information sent to python file");
        
    });
    childPython5.stderr.on('data',(data)=>{
        const res=data.toString();
        console.log(res);
    });
    childPython5.on('close',(code)=>{
        console.log("Final step also executed");
    });
    const doc= await formdata.save()
    // console.log(doc)
    // console.log(req.body)
    // res.json(req.body);
})
main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/otpvalidationsbyphone');
    console.log('db connected otp phone')
}
const OnetpSchema = new mongoose.Schema({
    OTP:Number,
    phonenum:Number,
})
const ONETP = mongoose.model('ONETP',OnetpSchema);


server.use(cors());
server.use(bodyParser.json());

server.post('/1',async(req,res)=>{
    console.log(req.body)
    // console.log("kkkkkk")
    let user= await ONETP.findOne(req.body)
    let x=user.OTP;
    console.log(x);
    console.log(user.phonenum);
    console.log(user);
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

server.post('/otp1',async(req,res)=>{
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
async function main(){
    await mongoose.connect('mongodb://localhost:27017/otpvalidations');
    console.log('db connected otp email')
}
const Onetp1Schema = new mongoose.Schema({
    OTP:Number,
    emaill:String,
})
const ONETP1 = mongoose.model('ONETP1',Onetp1Schema);


server.use(cors());
server.use(bodyParser.json());

server.post('/2',async(req,res)=>{
    console.log(req.body)
    // console.log("kkkkkk")
    let user= await ONETP1.findOne(req.body)
    let x=user.OTP;
    console.log(x);
    console.log(user.emaill);
    console.log(user);
    if(user){
        let user2=await ONETP1.findOneAndDelete(req.body)
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

server.post('/otp2',async(req,res)=>{
    let Onetp1 = new ONETP1();
    Onetp1.OTP= Math.floor(Math.random()*(9999-1000+1)+1000);
    Onetp1.emaill=req.body.emaill;
    const doc= await Onetp1.save()
    console.log(doc)
    console.log(req.body)
    const {spawn}= require('child_process');
        // const childPython =spawn('python',['--version']);
        const childPython =spawn('python',['fg.py',Onetp1.OTP,req.body.emaill]);
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
async function main(){
    await mongoose.connect('mongodb://localhost:27017/loginsignup');
    console.log('db connected login signup')
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

server.post('/m',async(req,res)=>{
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
server.listen(8083,()=>{
    console.log('server started')
})