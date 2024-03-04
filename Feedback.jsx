import React, { useState } from 'react'
import './Imagewb.css'
const Feedback = () => {
    const[form,setForm]=useState({})
    const handlefeed=(e)=>{
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
          })
    }
    const handlefeedback=async(e)=>{
        e.preventDefault();
        console.log(form);
        alert("Thanks for your valuable feedback")
        const response= await fetch("http://localhost:8083/feedbackdb",{
            method:'POST',body:JSON.stringify(form),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
  return (
    <div className='feedback'>
        <center>
            <br /><br /><br /><br />GIVE YOUR FEEDBACK HERE<br />
        <form className='feedbackform' onSubmit={handlefeedback}>
            <input type='text' placeholder='Enter your name' name='User' onChange={handlefeed}></input>
              <br />  <input type='text' placeholder='Subject' name='Content' onChange={handlefeed}></input>
               <br /> <button type='submit'>Submit</button>
        </form>
        </center>
    </div>

  )
}

export default Feedback