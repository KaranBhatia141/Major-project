import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./Messages.scss";


function Messages() {
   const [messages , setMessages] = useState([]);
   const [input  , setInput] = useState('');

   useEffect(()=>{
     fetchMessages();
   },[])
     const fetchMessages = async () =>{
        const res = await axios.get('http://localhost:8080/messages')
      //   .then(res =>console.log(res.data))
      //    .catch(err => console.error(err))
         
        setMessages(res.data);
     };

     const sendMessage = async (e)=>{
      e.preevntDefault();
        if(input.trim()==="") return ;
        const res = await axios.post('http://localhost:8080/messages' , {text:input});
        setMessages([...messages , res.data]);
        setInput("");
     }



  return (
    <div className="messages-container">
        <h2>Messages</h2>
        <div>
            {messages.map(msg =>(
               <div key={msg._id}>{msg.text}</div>
            ))}
        </div>

        <form>
        <input type="text"  value={input} placeholder='Your Message' onChange={(e)=>setInput(e.target.value)}/>
           <button onClick={sendMessage}>Send</button>
           </form>
    </div>
  )
}

export default Messages