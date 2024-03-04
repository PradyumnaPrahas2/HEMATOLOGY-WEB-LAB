import React from 'react'
import { useNavigate } from 'react-router-dom';
import Hematologywb from './Hematologywb';
import './Middle.css';
import Imagewb from './Imagewb';
const Middle = () => {
    const navigate=useNavigate()
    const redirecttext=(e)=>{
        e.preventDefault();
        navigate('/Hematologywb')
    }
    const redirectimage=(e)=>{
        e.preventDefault();
        navigate('/Imagewb')
    }
  return (
    <div className='All'>
    <center>
        <div className='Title'><h1>WELCOME TO HEMATOLOGY WEB LAB</h1></div>
        <p>on what data do you want to Predict??</p>
        <img className='an' src='https://th.bing.com/th/id/OIP.wKUj_B4LQ6Nx7OIKGkLBKAHaE6?w=258&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'></img> 
        <button onClick={redirecttext} className='ml'>ANEMIC DETECTION USING MACHINE LEARNING</button>
        <br />
        <img className='en' src='https://www.thebloodproject.com/wp-content/uploads/2022/06/WBC-subsets2_RESIZE-1024x807.png'></img>
        <button onClick={redirectimage} className='dl'>BLOOD DIESEASE DETECTION USING DEEP LEARNING</button>
    </center>
    </div>
  )
}

export default Middle