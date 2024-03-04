import {atom} from 'recoil';

export  const blockdatastate = atom({
    key:'blockdatastate',
    default : []
})

const id = Math.floor(Math.random() * 100); 
console.log(id)

export const page_source_id = atom({
    key:'page_source_id',
    default : id
})

export const isactive = atom({
    key : 'isStateActive',
    default : false
})