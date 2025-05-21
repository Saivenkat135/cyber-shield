 import "./styles/Login.css";
import Header from "./Header";


import React,{ useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function Login(){
   const [user, setUser] = useState({
        
       email : "",
       password : ""
         
   });
   const [invalidtext, setInvalidtext] = useState("");

   const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if(name==="password"&& value.length<8)
      {
        setInvalidtext("Password must contain 8 letters");
      }
      else if(name==="password"&&value.length>=8){
        setInvalidtext("");
      }
  };
 const goregister = ()=>{
    window.location.href=`/register`;
 }

    const submitHandler = async(e) => {
      e.preventDefault();
      console.log("submit handle");
      if(user.password.length<6) 
      {
          alert('password must contain 6 letters');
       }
      try{
         await axios.post('https://safecyber-api.onrender.com/api/user-sign-in',user).then(res=>{
            if(res.data.success){
            alert("login Succesfully!");
                  console.log(res.data.message);// without window.location.href = '/home2'; this console.log is worked sucessfully
   
                  setUser({name:'',email:'',password:''});
                  window.location.href = `/?email=${encodeURIComponent(user.email)}`;
                // navigate('/home2', { state: { message: res.data.message } }); // Pass message to the next page and go to next page also,that mean without window.location.href = '/home2';
                  // LOGIN page redirected from here
            }else{
              alert(res.data.message);
              console.log("hey    - ",res.data.message);
            }
              })
             // console.log("register")
             
      }
      catch(error){
          console.log('Error sending registration request',error);
      }
     
  };    

    return(
        <>

         <Header />
        <div className="div1-login"> 
        <form className='form-login' onSubmit={submitHandler} >
          <label className="label-login1">login form</label><br></br>
          <label className="label-login">Email ID:</label>
          <input className="input-login" value={user.email} onChange={changeHandler} name='email' type="tel"></input><br></br>
          <label className="label-login">Password:</label>
          <input className="input-login" value={user.password} onChange={changeHandler} name='password' type="password"></input>
          { invalidtext && <p className="Login-error">{invalidtext}</p>}
          <button className="btn-login" type="submit">Submit</button>
        <p onClick={goregister}>Click here to register</p>
        </form>        
        </div>
        </>
    )
}
export default Login;
 
