import React from 'react'
import {useState} from 'react'
import './OTP.css'
import LoginSignUP from './LoginSignUP'
const OTP = ({setShowOTP}) => {
    const data=0;
    const[valuetoconsiderp,setValuetoconsiderp]=useState(0);
    const[event,setEvent]=useState("");
    const[value,setValue]=useState("");
    const[form, setForm]=useState({});
    const[form2, setForm2]=useState({});
    const[num,setNum]=useState();
    const email=(e)=>{
      e.preventDefault();
        setEvent("EMAIL")
    }
    const handleform=(e)=>{
        
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
  }
  const handleform2=(e)=>{
        
    setForm2({
        ...form2,
        [e.target.name]: e.target.value
    })
}
const verifyotp=async(e)=>{
  e.preventDefault();
        console.log(form2);
        const response= fetch("http://localhost:8081/",{
            method:'POST',body:JSON.stringify(form2),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((opexc)=>{
            if(opexc){
                alert("sucesfully logged in")
                data=0;
                <LoginSignUP data={0}/>
            }
            else{
                alert("Invalid credentials")
                data=1;
                <LoginSignUP data={1}/>
            }
        })
        .catch((err)=>console.log(err))
}
  const generateOTP=async(e)=>{
    e.preventDefault();
    console.log(form);

    const response= await fetch("http://localhost:8081/otp",{
        method:'POST',body:JSON.stringify(form),
        headers:{
            'Content-Type':'application/json'
        }
    })}
  return (
    <form className='otpform' >
    <center>
      <div className='text'>
        <button className='close' onClick={()=>setShowOTP(false)}> X</button>
        <p>MODE OF VERIFICATION IS:-</p>
        <button className="btn" onClick={email}>EMAIL</button><br /><br />
       <br /><br />
        <br/>
        <p>Enter email(MANDATORY)</p>
        <input type="email" name='emaill' inputMode='emaill' className='emaill' onChange={handleform} placeholder='Enter email id'  required/>
        <br />
        <input type="text" name='OTP' inputMode='numeric' className='otp' onChange={handleform} placeholder='Enter a random number' maxLength="4" required/>
        <br />
        <button onClick={generateOTP}>GENERATE OTP</button><br/>
        <br />
        <form2>
        <p>Enter OTP which has been sent to your <div className='e'>{event}</div></p>
        <br />
        <input type="text" name='OTP' inputMode='numeric' className='otp' onChange={handleform2} placeholder='Enter 4 digit OTP' maxLength="4"/>
        <br />
        <button onClick={verifyotp}>VERIFY</button>
        </form2></div>
    </center></form>
  )

}

export default OTP;