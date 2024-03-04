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
    <div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-full max-h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Medicate</h5>
            </div>
            <button onClick={getpagesdata}>See history</button>
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                <Block  />
            </nav>
            
            <div className="w-full pt-5 px-4 mb-8 mx-auto ">
               <p><u>WELCOM TO MEDICATE</u></p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
