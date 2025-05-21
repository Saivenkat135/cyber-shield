import {  useState, useEffect } from "react";
import { Box , styled} from "@mui/material";

//components
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const RightComponent = styled(Box)`
    min-width: 300px;
    // height: 100%;
    max-height: 40vh;
     overflow: scroll;
`;

const ChatBox = (props) => {
  const [conversation, setConversation] = useState({});
  return (
    <RightComponent>
      <ChatHeader email={props.email} clickedchatId={props.clickedchatId}  />
      <Messages  email={props.email}  clickedchatId={props.clickedchatId}  />
    </RightComponent>
  );
};

export default ChatBox;
