import React , {useState, useEffect} from "react";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import Response from '../components/Response';
import Sidebar from "./Sidebar";
import { page_source_id } from "./store/atom/atom";
import { useRecoilState } from "recoil";

export function Chat() {
  const [question, setquestion] = useState("");
  const [response, setResponse] = useState("");
  const [finalque, setFinalque] = useState("");

  const [id , setId] = useRecoilState(page_source_id)

  const onchange = ({ target }) => setquestion(target.value);
  
  const submitFun = async()=>{

    // llm response
     const res = await axios.post('http://127.0.0.1:5000/data', {
            question : question
          }, {
          headers: {
            'Content-Type': 'text/plain'
          },
          responseType: 'text'
      })
      setResponse(res.data)
      setFinalque(question)

      // for creating a block page
   
      
  }

  const fetch = async() =>{
    if(response !== "" || finalque !== ""){
      await axios.post(`http://127.0.0.1:5000/history/${id}`,{
            response : response,
            finalque : finalque,
            source_id : id
        }, {
          headers : {
          'Content-Type': 'application/json'
        }})
        setId(id + 1)
    }
    
  }
  useEffect(()=>{
    fetch();
  }, [response])
  
  return (
    <>
       <Sidebar />
    
      <div className="flex justify-center">
      <div className=" absolute w-3/4 left-80">
        <Response res={response} que={finalque}/>
      </div>
      <div className="relative flex w-full max-w-[68rem] top-60">
        
        <Input
          type="question"
          label="Type your query"
          value={question}
          className="pr-20"
          onChange={onchange}
          containerProps={{
            className: "min-w-0",
          }}
        />
        <Button
          size="sm"
          color={question ? "gray" : "blue-gray"}
          disabled={!question}
          className="!absolute right-1 top-1 rounded"
          onClick={submitFun}
        >
          Submit
        </Button>

      </div>
    </div>
    </>
  
  );
}