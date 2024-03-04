import React,{useState} from 'react'
import './LoginSignUp.css'
import App from '../../App'
const Forgot = () => {
  const[event,setEvent]=useState("")
    const PH=async(e)=>{
      e.preventDefault();
        setEvent("PHONE NUMBER")
    }
    const email=async(e)=>{
      e.preventDefault();
        setEvent("EMAIL")
    }
  return (<>
    <center>
            <h3>Forgot Password</h3>
            <p>What would you choose for verification</p>
            <button className="btn" onClick={PH}>PH NO</button><br /><br />
            <button className="btn" onClick={email}>EMAIL</button>
            
            <br/><br/>
            <p>Enter OTP which is sent to your {event}</p>
            <input type="text" inputMode='numeric' className='otp' id='otp' placeholder='Enter 4 digit OTP' maxLength="4"/>
            <br /><br />
            <button type="SUBMIT" >SUBMIT</button>
            <br/><br/>
        
    </center>
</>
  )
}

export default Forgot