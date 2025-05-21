import React, { useState } from "react";
import Images from "../Home/Images";
import FAQ from "../Home/FAQs";
import "../styles/Homecomp.css";
function Homecomp({sendData}) {
  const [tabno,setTabnno]=useState(null);
  const CyberFaqData = [
    {
      question: "How does the AI-powered detection system work?",
      answer:
        "Our system uses advanced machine learning, NLP, and generative AI models to analyze online content, identify harmful patterns, and flag content for moderation.",
    },
    {
      question: "Can the system detect hate speech in multiple languages?",
      answer:
        "Yes, our solution supports multilingual detection by leveraging NLP techniques and pre-trained language models for a wide range of languages.",
    },
    {
      question: "How is misinformation detected and mitigated?",
      answer:
        "The system uses fact-checking algorithms, knowledge graphs, and cross-referencing with trusted sources to identify and flag misleading content.",
    },
    {
      question: "What measures are in place to ensure user privacy?",
      answer:
        "We employ strict data anonymization, encryption, and compliance with global privacy standards like GDPR to protect user information.",
    },
    {
      question: "Can the system adapt to emerging online threats?",
      answer:
        "Yes, the AI models are continuously updated using new datasets to adapt to evolving threats and ensure effective moderation.",
    },
    {
      question:
        "How does the system differentiate between harmful content and freedom of speech?",
      answer:
        "The solution uses context-aware models to balance content moderation with freedom of expression, minimizing false positives.",
    },
    {
      question: "Does the system provide real-time content moderation?",
      answer:
        "Absolutely, the platform is optimized for real-time detection and moderation, ensuring immediate action against harmful content.",
    },
    {
      question:
        "What are the benefits of using this solution for online platforms?",
      answer:
        "It enhances user safety, reduces moderation workload, improves platform trust, and helps maintain compliance with content policies.",
    },
    {
      question: "How accurate is the detection system?",
      answer:
        "Our solution achieves high accuracy through continuous training on diverse datasets, reducing false positives and false negatives.",
    },
    {
      question: "Is the system scalable for large online platforms?",
      answer:
        "Yes, the architecture is designed to scale seamlessly, handling high volumes of content efficiently for platforms of any size.",
    },
  ];
  return (
    <div className="homes-main">
      <Images />
      <div className="home-faq">
        <div className="home-censor">
        <div className="home-censor-text">
         <h3>Abuse Censor</h3>
         <div className="home-censor-tdiv">
         <p>To filter out toxic text and images</p><p className="home-censor-btn" onClick={()=>{sendData(2)}}>Click here</p>
         </div>
        </div>
        <div className="home-censor-img">
        </div>
        </div>

        <div className="home-censor">
        <div className="home-censor-text">
         <h3>Fact Check</h3>
         <div className="home-censor-tdiv">
         <p>To Check spreading info is real or fake</p><p className="home-censor-btn" onClick={()=>{sendData(3)}}>Click here</p>
         </div>
        </div>
        <div className="home-fact-img">
        </div>
        </div>

        <div className="home-censor">
        <div className="home-censor-text">
         <h3>Trending</h3>
         <div className="home-censor-tdiv">
         <p>To check what's trending</p><p className="home-censor-btn" onClick={()=>{sendData(4)}}>Click here</p>
         </div>
        </div>
        <div className="home-trend-img">
        </div>
        </div>

        <div className="home-censor">
        <div className="home-censor-text">
         <h3>Group Chat</h3>
         <div className="home-censor-tdiv">
         <p>To Chat with people in groups without abuse words </p><p className="home-censor-btn" onClick={()=>{sendData(5)}}>Click here</p>
         </div>
        </div>
        <div className="home-group-img">
        </div>
        </div>

        <div className="home-censor">
        <div className="home-censor-text">
         <h3>Gemini Chatbot</h3>
         <div className="home-censor-tdiv">
         <p>To get assistance of gemini chat bot</p><p className="home-censor-btn" onClick={()=>{sendData(6)}}>Click here</p>
         </div>
        </div>
        <div className="home-chat-img">
        </div>
        </div>

        <div className="home-censor">
        <div className="home-censor-text">
         <h3>Complaint portal</h3>
         <div className="home-censor-tdiv">
         <p>To file a complaint to cybercrime office</p><p className="home-censor-btn" onClick={()=>{sendData(7)}}>Click here</p>
         </div>
        </div>
        <div className="home-censor-img">
        </div>
        </div>
        <FAQ faqdata={CyberFaqData} who={"Cyberbullying"} />
      </div>
    </div>
  );
}

export default Homecomp;
