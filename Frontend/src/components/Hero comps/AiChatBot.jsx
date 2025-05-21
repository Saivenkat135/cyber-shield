import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../styles/AiChatBot.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

function AiChatBot() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm a SafeCyber ai chat-model (powered by Gemini Ai)! .I can help you to fight against Cyberbullies !",
      sentTime: "just now",
      sender: "Gemini Ai",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);

    await processMessageToBackend(newMessages);
  };

  // async function processMessageToBackend(chatMessages) {
  //   const apiMessages = chatMessages.map((messageObject) => ({
  //     role: messageObject.sender === "Assistant" ? "assistant" : "user",
  //     content: messageObject.message,
  //   }));

  async function processMessageToBackend(chatMessages) {
    const apiMessages = chatMessages.map((messageObject, index) => ({
      role: messageObject.sender === "Assistant" ? "assistant" : "user",
      content:
        index === chatMessages.length - 1 // Append text only to the last message
          ? `${messageObject.message} By default generate the output in English`
          : messageObject.message,
    }));

    try {
      const response = await fetch(
        "https://safecyber-api.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messagesreq: apiMessages,
          }),
        }
      );

      const data = await response.json();

      // const testing = `<MarkdownDisplay data={data.data} />`;
      setMessages([
        ...chatMessages,
        {
          message: data.data,
          sender: "Assistant",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with the server:", error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      <div className="gipp">
        <div
          style={{
            position: "relative",
            height: "75vh",
            width: "100%",
          }}
        >
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                // style={{ backgroundColor: "green", color: "red" }}
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="Cyber Support is typing ......" />
                  ) : null
                }
              >
                {messages.map((message, i) => (
                  <Message key={i} model={message} />
                ))}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}

export default AiChatBot;
