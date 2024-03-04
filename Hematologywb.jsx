import React, { useState } from 'react'
import './Hematologywb.css'
import Allmodels from './Allmodels';
import { useNavigate } from 'react-router-dom';
const Hematologywb = ({setShowmainp}) => {
  const navigate=useNavigate()
  const[dataresult,setDataresult]=useState('NULL')
  const[form3,setForm3]=useState({})
  const[algorithm,setAlgorithm]=useState('NULL');
  const[form4,setForm4]=useState({})
  const[finalresult,setFinalresult]=useState('NULL');
  const[finalresult2,setFinalresult2]=useState('NULL');
  const[finalgroundresult1,setFinalgroundresult1]=useState("NULL");
  const[finalgroundresult2,setFinalgroundresult2]=useState("NULL");
  const[allmodels,setAllmodels]=useState(false);
  const[enable,setEnable]=useState(false);
  const getallmodels=()=>{
    setAllmodels(true);
  }
  const feedbackbtn=(e)=>{
    e.preventDefault();
    navigate('/Feedback')
  }
  const fetchingdata=(e)=>{
    const response=fetch("https://23egkktlyi.execute-api.us-east-1.amazonaws.com/stage_1/dev",{
      method:'POST',body:JSON.stringify(form3),
      headers:{
        'Content-Type':'application/json'
    }
    })
    .then((res)=>res.json())
    .then((data)=>{setDataresult(data.Output)
      console.log(data.Output)
    })
    .catch((err)=>console.log(err))
  }
  const formvalues=(e)=>{
    setForm3({
      ...form3,
      [e.target.name]: e.target.value
    })
    {e.target.name==='Model'?setAlgorithm(e.target.value):setAlgorithm('NULL')}
  }
  const groundresult=async(e)=>{
    e.preventDefault();
    console.log(form3);
        const response= fetch("http://localhost:8083/gr",{
            method:'POST',body:JSON.stringify(form3),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((opexc)=>{
            if(opexc){
              setFinalgroundresult1('ANEMIC')
                alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 5 fields")
                
            }
            else{
              setFinalgroundresult1("NON-ANEMIC")
              alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 5 fields")
              
            }
        })
        .catch((err)=>console.log(err))

  }
  const groundresult2=async(e)=>{
    e.preventDefault();
    console.log(form3);
        const response= fetch("http://localhost:8083/gr2",{
            method:'POST',body:JSON.stringify(form3),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((opexc)=>{
            if(opexc){
              setFinalgroundresult2('ANEMIC')
                alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 5 fields")
                
            }
            else{
              setFinalgroundresult2("NON-ANEMIC")
              alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 5 fields")
              
            }
        })
        .catch((err)=>console.log(err))

  }
  const getresult=async(e)=>{
    e.preventDefault();
        console.log(form3);
        const response= fetch("http://localhost:8083",{
            method:'POST',body:JSON.stringify(form3),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((opexc)=>{
            if(opexc){
              setFinalresult('ANEMIC')
                alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 5 fields")
                
            }
            else{
              setFinalresult("NON-ANEMIC")
              alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 5 fields")
              
            }
        })
        .catch((err)=>console.log(err))
  }
  const getresult2=async(e)=>{
    e.preventDefault();
        console.log(form3);
        const response= fetch("http://localhost:8083/res2",{
            method:'POST',body:JSON.stringify(form3),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((opexc)=>{
            if(opexc){
              setFinalresult2('ANEMIC')
                alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 3 fields")
                
            }
            else{
              setFinalresult2("NON-ANEMIC")
              alert("NOTE:-\nThe result is processed by using GAUSSIAN NAIVE BAYES ALGORITHM 3 fields")
              
            }
        })
        .catch((err)=>console.log(err))
  }
  const submitform3=async(e)=>{
    e.preventDefault();
    console.log(form3);
    setEnable(true);
    const response= await fetch("http://localhost:8083/formdatabase",{
        method:'POST',body:JSON.stringify(form3),
        headers:{
            'Content-Type':'application/json'
        }
    })

  }
  
  return (
    <>
    <div className='back'>
      <center>
    <div className='Title'>
                    ANEMIC DETECTION TEST:-</div></center>
    {/* <center><h1>ANEMIC DETECTION TEST:-</h1></center> */}
    <div className='main'>
        <center>
        <form3 >
        <label for="Nameofthepatient">Nameofthepatient:</label>
        <input type="text" name="Nameofthepatient" id="Nameofthepatient" className='Nameofthepatient' min='0' max='100000000' maxLength='9' placeholder="NAME" onChange={formvalues} required/><br />
        <br />
        <label for="Gender">GENDER:</label>
        {/* <input type="text" id="Gender" name="Gender" className='Gender' placeholder='(BLOCK LETTERS ONLY)' onChange={formvalues} required/>
         */}
        <select name='Gender' id='Gender' onChange={formvalues} > 
          <option value='NULL'>N-A</option>
          <option  value='0'>MALE</option>
          <option  value='1'>FEMALE</option>
        </select>
        <br/><br />
        <label for="Hemoglobin">Hemoglobin:</label>
        <input type="number" id="Hemoglobin" name="Hemoglobin" className='Hemoglobin' min='0' max='100' step='0.01' maxLength='4' placeholder="in g/dl" onChange={formvalues} required/>
        <br/><br />
        <label for="MCH">MCH:</label>
        <input type="number" name="MCH" id="MCH" placeholder="pg"   className='MCH' min='0' max='100' step='0.01' maxLength='4' onChange={formvalues} required/><br/><br/>
        <label for="MCHC">MCHC:</label>
        <input type="number" name="MCHC" id="MCHC" placeholder="g/dL" className='MCHC' min='0' max='100' step='0.01' maxLength='4' onChange={formvalues} required/><br/><br/>
        <label for="MCV">MCV:</label>
        <input type="number" name="MCV" id="MCV" placeholder="L" className='MCV' min='0' max='100' step='0.01' maxLength='4' onChange={formvalues} required/><br/><br/>
        
        <label for="Model">Select Model to be implemented:</label>
        <select name='Model' id='Model' onChange={formvalues} > 
          <option value='NULL'>N-A</option>
          <option  value='RF'>RANDOM FOREST(RF)</option>
        </select>
        <br />
        <label className='resultbtn' for='result'>RESULT:</label>
        <input  type="text" name='result' className='resultbtn' onChange={formvalues} value='NON ANEMIC\r\n'/>
        <br />
        <button type="submit" className='sub' onClick={submitform3}>SUBMIT DETAILS</button>
        <button className='r' onClick={getallmodels}>GET RESULT USING ALL MODELS</button>
        {/* {allmodels && <Allmodels setAllmodels={setAllmodels}/>} */}
        <br />
        {enable &&<>
        <button className='re' onClick={getresult}>GET RESULT </button>
        {/* <br />
        <button className='re2' onClick={getresult2}>GET RESULT USING 3 FIELDS</button> */}
        <br />
        <button className='re3' onClick={groundresult}>GET GROUND TRUTH</button>
        <br /></>}
        {/* <button className='re4' onClick={groundresult2}>GET GROUND TRUTH2</button> */}
        {/* <button onClick={getresult}>GET RESULT</button> */}
        
    </form3>
    </center>
    </div>
    <center>
    <div className='Result table10'>
      <div className='tetext'>GROUND TRUTH OF THE GIVEN DATA:-
      <h2>{finalgroundresult1} </h2><br /></div>
      {!allmodels &&
      <>
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
              <div className='a'><h3>RANDOM FOREST</h3></div>
              </th>
              <th>
        {finalresult === 'NULL'?<div className='n'><h3>NULL</h3></div>:
           finalresult==='ANEMIC'?<div className='a'><h3>ANEMIC</h3></div>:
            <div className='na'><h3>NON ANEMIC</h3></div>
        }</th>
        </tr>
      </table>
      <button onClick={feedbackbtn}className='sub'>GIVE FEEDBACK</button>

    </>}
    </div>
    </center>
    </div>
    <div className='nexttable'>
    <center>
    {allmodels && <Allmodels setAllmodels={setAllmodels}/>}
    </center>
    </div>
    </>
  )
}

export default Hematologywb