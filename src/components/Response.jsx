import React from 'react'
import {useState ,useEffect } from 'react';
import {useRecoilState, useRecoilValue} from 'recoil'
import { blockdatastate } from './store/atom/atom';
import axios from 'axios';
import { isactive } from './store/atom/atom';

function Response({res, que}) {
  const [arr,setArr] = useState([]);
  
  const [blockdata, setblockdata] =  useRecoilState(blockdatastate)
  const [isstateactive,setIsAtive] = useRecoilState(isactive)
  useEffect(()=>{
    if (que !== "" && res !== "") {
      setArr(prevArr => [...prevArr, { que, res }]);
    }
    // if(id !== 0){
    //   storecall();
    // }
    setIsAtive(true);

  },[que,res])

  

  // const storecall = async()=>{
  //   await axios.put(`http://127.0.0.1:5000/history?id=${id}`, arr)
  // }

  return (
    <div className=" bg-white opacity-80 font-semibold rounded-lg p-10 w-full" >

      {isstateactive? 
          arr && arr.map((e, index)=>{
              return <div key={index}>
                {e.que && <p>{e.que}</p>} <br/>
                {e.res && <p>{e.res}</p>}<br/>
              </div>  
         })
     
      :
           blockdata.map((e , index) =>{
                return<div key={index}>
                  <h3>{e.finalque}</h3><br></br>
                <h5>{e.response} </h5><br></br>
              </div>
            })
     
      }
 
     

      

      
    </div>
  )
}

export default Response
