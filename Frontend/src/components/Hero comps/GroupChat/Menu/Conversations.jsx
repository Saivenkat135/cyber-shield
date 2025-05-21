import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { Box, styled, Divider } from '@mui/material';

import axios from 'axios';
//components
import Conversation from './Conversation';
import CreateChatButton from './CreateChatButton';
// import { getUsers } from '../../../service/api';

const Component = styled(Box)`
    // overflow: overlay;
    height: 70vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = (props) => {  // once text
    const [chats, setChats] = useState([{chat_id:1}]);

    // const { account, socket, setActiveUsers } = useContext(AccountContext);
    // useEffect(() => {
    //     socket.current.emit('addUser', account);
    //     socket.current.on("getUsers", users => {
    //         setActiveUsers(users);
    //     })
    // }, [account])

    useEffect(() => {
        const fetchData = async() => {
            // let data = await getUsers();
            // let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            // setUsers(fiteredData);
            try{
                 await axios.post('https://safecyber-api.onrender.com/api/getuinfo',{email: props.email}).then(res=>{
                    if(res.data.success){
                               
                    // setUser(res.data.data);
                    setChats(res.data.data.chats);
                    console.log("res.data.data.chats    : ",res.data.data.chats)
                    }else{
                      alert("Error : to retrieve get-user-info email -> ",props.email);
                    }
                      })
                     // console.log("register")
                     
              }
              catch(error){
                  console.log('Error sending registration request',error);
              }
        }
        fetchData();
    }, []);

    return (
        <>
        <Component>
        {
                    chats && chats.map((obj, index) => (
                <React.Fragment key={index}>
                    <Conversation chat_id={obj.chat_id} 
                    setclickedchatId={props.setclickedchatId}   />

                    {chats.length !== (index + 1) && <StyledDivider />}
                </React.Fragment>
            ))
        }
        <CreateChatButton email={props.email} />
        </Component>
        
</>
    )
}

export default Conversations;