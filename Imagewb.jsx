import React, { useState } from 'react'
import './Imagewb.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Imagewb = () => {
    const navigate=useNavigate()
    const [selectedFile,setSelectedFile]=useState(null);
    const[rprocessed,setRprocessed]=useState('NULL');
    const[image,setImage]=useState('');
    const [formim,setFormim]=useState('')
    const handleform=(e)=>{
        e.preventDefault()
        // console.log(e.target.file[0]);
        setImage(e.target.files[0]);
        // setFormim({
        //     ...formim,
        //     [e.target.name]:[e.target.value]
        // })
        const file=e.target.files[0];
        if(file){
          const reader=new FileReader();
          reader.onloadend=()=>{
            setSelectedFile(reader.result);
          };
          reader.readAsDataURL(file);
        }
    }
    const submitImage=async(e)=>{
      e.preventDefault();
      alert("Click OK and wait for 30-40 seconds");
      const formData=new FormData();
      formData.append("image",image);
      const result=await axios.post("http://localhost:8083/upload-image",
      formData,
      {
        headers:{"Content-Type":"multipart/form-data"},
      })
    }
    const feedbtn=(e)=>{
      e.preventDefault()
      navigate('/Feedback')
    }
    const getresult=async(e)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("image",image);
      const response= fetch("http://localhost:8083/image-result",{
            method:'POST',body:(formData),
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res)=>res.json())
        .then((opexc)=>{
            if(opexc){
              setRprocessed('EOSINOPHIL');
                alert("NOTE:-\nThe result is processed by using SEQUENTIAL MODEL OF CNN")
                
            }
            else{
              setRprocessed("NEUTROPHIL");
              alert("NOTE:-\nThe result is processed by using SEQUENTIAL MODEL OF CNN")
              
            }
        })
    }
  return (
    <>
    <div className='complete'>
    <center>
        <div className='Title'><h1>WELCOME TO IMAGE CLASSIFICATION LAB</h1></div>
            <h3>EOSINOPHIL OR NEUTROPHIL DETECTION TEST </h3>
            <br /><br />
        <form onSubmit={submitImage}>
        <div className='inbox'>
        <input type="file" accept='image/*' name="file" onChange={handleform} className='input'></input>
        <br/><br/>
        {/* <img src="C:\Users\praha\Downloads\WhatsApp Image 2024-01-05 at 19.49.17.jpeg" alt='Cannot display image rn' className='image'></img><br /><br /> */}
        {selectedFile && <img src={selectedFile} alt="Cannot Display rn" style={{maxWidth:'50%',maxHeight:'20%'}} className='bloodcell'></img>}
        <br></br>
        <label for="MODEL">MODEL:</label>
        <select name='MODEL' id='MODEL' > 
          <option value='NULL'>N-A</option>
          <option  value='0'>SEQUENTIAL</option>
        </select>
        <br />
        <br />
        <button type='submit' className='button'>SUBMIT</button>
        <br />
        <br />
        <button onClick={getresult} className='button2'>GET RESULT</button>
        </div>
        </form>
    </center>
    <table>
    <thead>
      <tr>
        <th>MODEL</th>
        <th>RESULT</th>
        {/* <th>RESULT-2</th></tr> */}
        </tr>
        </thead>
        <tr>
          <th>
          <div className='a'><h3>SEQUENTIAL</h3></div>
          </th>
          <th>
    {rprocessed === 'NULL'?<div className='n'><h3>NULL</h3></div>:
       rprocessed==='EOSINOPHIL'?<div className='a'><h3>EOSINOPHIL</h3></div>:
        <div className='na'><h3>NEUTROPHIL</h3></div>
    }</th>
    </tr>
  </table>
  <center>
    <br /><br />
  <button className='button' onClick={feedbtn}>GIVE FEEDBACK</button></center>
  </div>
  </>
  )
}

export default Imagewb