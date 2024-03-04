import React,{useState,useEffect} from 'react'
import './Allmodels.css'
const Allmodels = () => {
    const[data,setData]=useState([{}])
    useEffect(()=>{
        fetch("/table").then(
            res=>res.json()
        ).then(
            data=>{
                setData(data)
                console.log(data)
            }
        )
    },[])
    return(
        <>
        <div className='Result table'>
            {(typeof data.GNB==='undefined')?(
                <p>LOADING....</p>
            ):(
                // data.GNB.map((member,i)=>(
                //     <p key={i}>{member}</p>
                // )
                <>
                <table>
                    <thead>
                        <tr>
                            <th>MODEL NAME</th>
                            <th>PREDICTION BY 3 FIELDS</th>
                            <th>PREDICTION BY 5 FIELDS</th>
                        </tr>
                    </thead>
                    <tr>
                        <th>GAUSSIAN NAIVE BAYES</th>
                        <th>{data.GNB}</th>
                        <th>{data.GNB2}</th>
                    </tr>
                    <tr>
                        <th>K NEAREST NEIGHBOURS</th>
                        <th>{data.KNN}</th>
                        <th>{data.KNN2}</th>
                    </tr>
                    <tr>
                        <th>LOGISTIC REGRESSION</th>
                        <th>{data.LR}</th>
                        <th>{data.LR2}</th>
                    </tr>
                    <tr>
                        <th>DECISION TREE</th>
                        <th>{data.DT}</th>
                        <th>{data.DT2}</th>
                    </tr>
                    <tr>
                        <th>RANDOM FOREST</th>
                        <th>{data.RF}</th>
                        <th>{data.RF2}</th>
                    </tr>
                    <tr>
                        <th>SUPPORT VECTOR MACHINE</th>
                        <th>{data.SVM}</th>
                        <th>{data.SVM2}</th>
                    </tr>
                </table>
                </>
                )
            }
        </div>
        </>
    )
}

export default Allmodels