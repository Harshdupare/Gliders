import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useRecoilState, useRecoilValue} from 'recoil'
import { blockdatastate } from './store/atom/atom';




function Block() {
  const [blockdata, setblockdata] =  useRecoilState(blockdatastate)
 
  // const [count, setCount] = useState(0);
  // const id  = useRecoilValue(page_source_id)
  // const pageSourceId = useRecoilValue(page_source_id);

    // const getpagesdata = async()=>{
    //     const {data} = await axios.get(`http://127.0.0.1:5000/history`)
    //     console.log(data)
    //     setblockdata([data]);
    //  }
    // useEffect(()=>{
    //   getpagesdata();
    // },[])

  return (<>
          {Array.isArray(blockdata) ? blockdata.map((e, index) =>{
            return <div  key={index} role="button" tabIndex="0" className="items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">        
                  <h5>{e.finalque} </h5><br></br>
                </div>      
          }
          ): null
          }
      </>
  )
}

export default Block
