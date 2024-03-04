const express = require('express');
const server=express();
const cors = require('cors');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/formdatabase');
    console.log('db connected')
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
const feedbackschema= new mongoose.Schema({
    name:String,
    content:String,
})
const FormData = mongoose.model('Login',formdataSchema);
const FeedData= mongoose.model('Feedback',feedbackschema);

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
server.post('/feedbackdb',async(req,res)=>{
    let feeddata= new FeedData();
    feeddata.name=req.body.User;
    feeddata.content=req.body.Content;
    const doc= feeddata.save();
    console.log(doc);
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
        const doc= await formdata.save()
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
server.listen(8083,()=>{
    console.log('server started')
})
// ////////////////////////////////////////////////////////////
const ImagedataSchema = new mongoose.Schema({
    fname:String,
    resultp:String
})
const ImageData = mongoose.model('Image',ImagedataSchema);

const multer=require('multer')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
    
})
const upload=multer({storage:storage})
server.post("/upload-image",upload.single("image"),async(req,res)=>{
    console.log(req.file.originalname);
    let imagedata=new ImageData();
    imagedata.fname=req.file.originalname;
    const x=req.file.originalname;
    const {spawn}= require('child_process');
    const childPython =spawn('python',['deeplearning.py',x]);
    childPython.stdout.on('data',(data)=>{
        const res=data.toString();
        imagedata.resultp=String(res);
        console.log("This is the actual output")
        console.log(String(res));
        
    });
    childPython.stderr.on('data',(data)=>{
        const res=data.toString();
        console.log(res);
    });
    childPython.on('close',(code)=>{
        console.log((code))
        const doc= imagedata.save();
        console.log(doc);
    });

    res.send("Uploaded")
})
server.post("/image-result",async(req,res)=>{
    // console.log("kkkkkk")
    console.log(req.body)
    let user=await ImageData.findOneAndDelete({'resultp':'EOSINOPHIL\r\n'})
    //let user= await ImageData.findOne({'fname':req.file.originalname,'resultp':'EOSINOPHIL'})
    console.log(user);
    if(user){
        res.status(200).json(true)
    }
    else{
        let user2=await ImageData.findOneAndDelete({'resultp':'NEUTROPHIL\r\n'})
        if(user2){
            res.status(200).json(false)
        }
        else{
            res.status(200).json(true)
        }
    }
})