import React, {useState} from 'react'
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import OTP from './OTP';
import './OTP.css'
import './LoginSignUp.css'
import Phno from './Phno';
import Hematologywb from './Hematologywb';
import App from '../../App';
import Middle from './Middle';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
const LoginSignUP = (props) => {
    const[valuetoconsider,setValuetoconsider]=useState(1);
    const navigate=useNavigate();
    const[condition,setCondition]=useState(false);
    const [action,setAction]=useState("SIGNUP");
    const[Email,setEmail]=useState('');
    const[Lastname,setLastname]= useState('');
    const[Firstname,setFirstname]= useState('');
    const[Phonenumber,setPhonenumber]= useState('');
    const[Password,setPassword]= useState('');
    const[Username,setUsername]= useState('');
    const[password,setpassword]= useState('');
    const[form, setForm]=useState({});
    const[showOTP,setShowOTP]=useState(false);
    const[phone,setShowphone]=useState(false);
    const[showmainp,setShowmainp]=useState(false);
    const handleform=(e)=>{
        
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(props.data)
        console.log(valuetoconsider)
        if(valuetoconsider==1){
            alert('VERIFY FIRST')
        }
        else{
        alert('Form data has been approved and stored, Redirecting to login page')
        console.log(form);
        setAction("LOGIN")

        const response= await fetch("http://localhost:8080/demo",{
            method:'POST',body:JSON.stringify(form),
            headers:{
                'Content-Type':'application/json'
            }
        
        })
    }
    }
    const click1=(e)=>{
        e.preventDefault();

        alert("Form submitted successfully you can login now");
    }
    const click4=()=>{
        setAction("LOGIN")
    }
    const click3=()=>{
        setAction("LOGIN")
    }
    const email=()=>{
        setShowOTP(true)
    }
    const phonenumber=()=>{
        setShowOTP(true)
    }
    const otpfun=async(e)=>{
        e.preventDefault();
        setCondition(true)
        setShowOTP(true)
    }
    const handleSubmit2=async(e)=>{
        e.preventDefault();
        console.log(form);
        const response= fetch("http://localhost:8080/",{
            method:'POST',body:JSON.stringify(form),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((opexc)=>{
            if(opexc){
                alert("sucesfully logged in")
                navigate('/Middle')
               
            }
            else{
                alert("Invalid credentials")
            }
        })
        .catch((err)=>console.log(err))
    }
  return (
    <>
    <div className='everything'>
    <center>
    <div className='heading'><center><b>WELCOME TO HEMATOLOGY WEB LAB</b></center></div>
    <div className='banner'>
                    {/* <div className='submit-container'>
                        <div className={action==='LOGIN'?"submit gray":"submit"}>SIGNUP</div>
                        <div className={action==='SIGNUP'?"submit gray":"submit"}>LOGIN</div>
                    </div> */}
                    <div className='INPUTS'>
                        {action==="LOGIN" ?
                        <>
                        <center>
                        <form onSubmit={handleSubmit2} align="center">
                        <div className='Title12'>
                           <center><h1>{action}</h1></center></div>
                            <div className='para1'>
                        {/* <label for="Username"><b>USERNAME:</b></label> */}
                        <div className='input-box'>
                        <input onChange={handleform} type="text" name="Username" id="Username" placeholder="Enter username" required/></div>
                        <br/>
                        <br/>
                        {/* <label for="password"><b>PASSWORD:</b></label> */}
                        <div className='input-box'>
                        <input onChange={handleform} type="password" name="Password" id="Password" placeholder="Enter your password" required/></div>
                        <br/>
                        {/* <button onClick={forgot}>Fpass?</button> */}
                        <br/><br/>
                        <button type='submit' className='button1' >LOGIN</button> 
                        {/* <button className='button2' onClick={shootreset}>RESET</button> */}
                        </div>
                        </form>
                        </center>
                        </>:
                    <>
                    <center>

                    <form onSubmit={handleSubmit} align="center">
 
                    <div className='Title12'>
                    <h1>{action} {props.data}</h1></div>
                    <div className='para1'><br/>
                    {/* <label for="First name"><b>FIRST NAME:</b></label> */}
                    <div className='input-box'>
                    <input  onChange={handleform} type="text" name="Firstname" id="Firstname" placeholder="Enter First name" required/></div>
                    {/* <label for="Last name"><b>Last Name:</b></label> */}
                    <div className='input-box'>
                    <input  onChange={handleform}type="text" name="Lastname" id="Lastname" placeholder="Enter your Last name" required/></div>
                    {/* <label for="Phone Number"><b>Phone number:</b></label> */}
                    <div className='input-box'>
                    <input  onChange={handleform}type="text" name="Username" id="Username" placeholder="Enter Username" required/></div>
                    <div className='input-box'>
                    <input  onChange={handleform}type="number" name="PhoneNumber" id="PhoneNumber" placeholder="Enter Phone Number" required/></div>
                    {/* <label for="Email"><b>Email:</b></label> */}
                    <div className='input-box'>
                    <input  onChange={handleform}type="email" name="Email" id="Email" placeholder="Enter Email" required/></div>
                    {/* <label for="Password"><b>Password:</b></label> */}
                    <div className='input-box'>
                    <input  onChange={handleform} type="password" name="Password" id="Password" placeholder="Enter Password" required/></div>
                    <p>What do you want to choose for verification?</p>
                    <button type='button' className='button3' onClick={()=>setShowOTP(true)}>EMAIL</button>
                    {/* ()=>setShowOTP(true) */}
                    <button type='button' className='button3' onClick={()=>setShowphone(true)} >PHONE NO</button>
                    <br/><br/><br/>
                    {showOTP && <OTP setShowOTP={setShowOTP}/>}
                    {phone && <Phno setShowphone={setShowphone}/>}
                    <button type='submit' className='button1' >SIGNUP</button>
                    <button className='button2' onClick={click4}>Go to Login</button>
                    <br />
                    {/* <button className='button2' onClick={shootreset}>RESET</button> */}
                    </div>
                    </form>
                    </center></>
                    }
                    </div>
                    </div></center></div>
                    {/* {showOTP && <OTP setShowOTP={setShowOTP}/>} */}
                    </>
                     
            
  )
}

export default LoginSignUP