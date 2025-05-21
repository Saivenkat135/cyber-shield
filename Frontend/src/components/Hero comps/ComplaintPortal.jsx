import '../styles/ComplaintPortal.css';
import React from 'react'
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';

export default function ComplaintPortal({email}) {
  const [inputValue, setInputValue] = useState('');
    const textAreaRef = useRef(null); 
    const [tdata,setData]=useState("");
    const adjustHeight = (textAreaElement) => {
      textAreaElement.style.height = 'auto';  // Reset height to auto to calculate new height
      textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;  // Set new height based on content
    };
    let flag=true;
    if(email)
      {
        flag=false;
      }
      else{
        flag=true;
      }
      const handleClick = ()=>{
        window.location.href='/register';
      }
      const handleChange =(e)=>{
        setData(e.target.value);
        setInputValue(e.target.value);
         adjustHeight(e.target);
        
       }
      const handleSubmit =async ()=>{
        
          // let data = await getUsers();
          // let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
          // setUsers(fiteredData);
          try{
            const sendMsg = {email:"devavatturi@gmail.com", message:`the user email id : ${email} \n complaint: ${inputValue}` };
            console.log(" complaint obj : ", sendMsg);
               await axios.post('https://safecyber-api.onrender.com/api/send-email',sendMsg).then(res=>{
                  if(res.data.success){
              
                  console.log("successfully pushed/uploaded the msg")
                  }else{
                    alert("Error : to push msg  ");
                  }
                    })
                   // console.log("register")
                   
            }
            catch(error){
                console.log('Error sending registration request',error);
            }
      }
  return (
    <div>
      {flag && (
        <div className="login-prompt">
          <div className="login-box">
            <p>Please login to access this feature.</p>
            <button onClick={handleClick}>Login</button>
          </div>
        </div>
      )}
      { !flag &&
    <div className="div1-com" >

    <p className="para-com">ComplaintPortal</p>
     <div className="div2-com">

     <textarea className="textarea-com"
     ref={textAreaRef}
     name="tdata"
     value={inputValue}
     onChange={handleChange}
     placeholder="Start typing..."

     ></textarea>

     </div>
     <button className="btn-com" onClick={handleSubmit}>submit</button>
    
    </div>
      }
    </div>
    
  )
}
