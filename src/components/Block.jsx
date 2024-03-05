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
            return <div  key={index} role="button" tabIndex="0" className="hover:bg-blue-200 p-4 font-semibold rounded-lg">        
                  <h5>{e.finalque} </h5>
                </div>      
          }
          ): null
          }
      </>
  )
}

export default Block
