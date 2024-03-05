import React, { useState } from 'react'
import Block from './Block'
import axios from 'axios';
import {useRecoilState, useRecoilValue} from 'recoil'
import { blockdatastate } from './store/atom/atom';
import {isactive } from "./store/atom/atom";

function Sidebar() {
  const [blockdata, setblockdata] =  useRecoilState(blockdatastate)
  const [isstateactive,setIsAtive] = useRecoilState(isactive)
  const getpagesdata = async()=>{
    const {data} = await axios.get(`http://127.0.0.1:5000/history`)
    console.log(data)
   
    setIsAtive(false)
    setblockdata(data); 
    
 }
// useEffect(()=>{
//   getpagesdata();
// },[])
  return (
    <div className='bg-opacity-40'>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-opacity-30 bg-gray-200 text-gray-700 h-full max-h-full w-full max-w-[15rem] mt-10 p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">History</h5>
            </div>
            <button className='bg-black rounded-xl p-4 text-white' onClick={getpagesdata}>See history</button>
            <nav className="flex flex-col w-[200px] pt-2 font-sans text-base font-normal text-gray-700">
                <Block  />
            </nav>
        </div>
    </div>
  )
}

export default Sidebar
