import { useState, useEffect, useContext, useRef } from "react";
import { Box, styled } from "@mui/material";
import axios from "axios";
// import { io } from 'socket.io-client';

//components
import Message from "./Message";
import Footer from "./Footer";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const StyledFooter = styled(Box)`
  height: 55px;
  background: #ededed;
  // position: absolute;
  width: 100%;
  // bottom: 0
`;

const Component = styled(Box)`
  height: 50vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({email, clickedchatId}) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const [allMsgsofChat, setallMsgsofChat] = useState();

  const scrollRef = useRef();

  //   const { account, socket, newMessageFlag, setNewMessageFlag } =
  //     useContext(AccountContext);

  //   useEffect(() => {
  //     socket.current.on("getMessage", (data) => {
  //       setIncomingMessage({
  //         ...data,
  //         createdAt: Date.now(),
  //       });
  //     });
  //   }, []);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ transition: "smooth" });
    }, [clickedchatId]);

    
    const getConversationMessage = async() => {
      console.log("get convo is colled msg.jsx ---------------------------");
   try{
       await axios.post('https://safecyber-api.onrender.com/api/getmsg',{chat_id: clickedchatId}).then(res=>{
          if(res.data.success){
            // console.log("conversation.jsx : const messages -> ",res.data.msgs)
            setallMsgsofChat(res.data.msgs)

          }else{
              alert("Error : to retrieve getmsg");
          }
            })                    
      }
      catch(error){
          console.log('Error getting msgs ',error);
      }
}

useEffect(() => {
   getConversationMessage();
}, [clickedchatId]);

const censorText =async(text)=>{
  try{
      const response = await fetch("https://safecyber-api.onrender.com/api/contsensor-text",
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        tdata: text,
                                      }),
                                    }
                                  );
      const data = await response.json();
      if(data.success){
        return data.sdata;
      }else{
        console.log("failure at content censorr !, but retruned data");
        return data.sdata;
      }
  } catch(e) {
       console.log("error : ->  ",e);
       return text;
    }
}
const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;

    let text=value;
    try{
      text = await censorText(text);
    }catch(e){
      console.log("at sendtext failed to censor it: ",e);
    }
    if (code === 13) {
            let message = {};
            if (!file) {
              message= {  
                    chat_id :clickedchatId ,
                    chat_name:allMsgsofChat[0]?.chat_name,
                    sentemail: email,  
                    mdata:text
                  }
            } else {
                message = {
                    text: image,
                    chat_id :clickedchatId ,
                    chat_name:allMsgsofChat[0]?.chat_name,
                    sentemail: email,   
                    mdata:value
                };
            }
            // socket.current.emit("sendMessage", message);
        const postMsg = async() => {
                try{
                    await axios.post('https://safecyber-api.onrender.com/api/pushmsg',message).then(res=>{
                        if(res.data.success){
                        console.log("successfully pushed/uploaded the msg");
                        }else{
                          alert("Error : to push msg  ");
                        }
                          })
                    // reload
                        await getConversationMessage();  
                  }catch(error){
                      console.log('Error sending registration request',error);
                  }
          }

          console.log("below ref");
      postMsg();
      setValue("");
      setFile();
      setImage("");
    }
  };

  return (
    <Wrapper>
      <Component>
        {allMsgsofChat &&
          allMsgsofChat.map((message) => (
            <Container ref={scrollRef}>
              <Message message={message} email={email} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
