import "../styles/Misinfo.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Make sure to import axios for the API call

function Misinfo() {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef(null);
  const [explanation, setExplanation] = useState(""); // Use state to store explanation
  const [realper, setRealPer] = useState(""); // Use state for real percentage
  const [source, setSource] = useState(""); // Use state for source
  const [tdata, setData] = useState("");
  const [result, setResult] = useState({
    isReal: false,
    realper: 0,
    source: "",
  });
  const [flag, setFlag] = useState(true); // This flag will toggle the result display

  const handleChange = (e) => {
    setData(e.target.value);
    setInputValue(e.target.value);
    adjustHeight(e.target);
  };

  const adjustHeight = (textAreaElement) => {
    textAreaElement.style.height = "auto"; // Reset height to auto to calculate new height
    textAreaElement.style.height = `${textAreaElement.scrollHeight}px`; // Set new height based on content
  };

  // Set initial height when the component mounts
  useEffect(() => {
    if (textAreaRef.current) {
      adjustHeight(textAreaRef.current);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      // Send input data to the '/chat' endpoint
      let response = await axios.post(
        "https://safecyber-api.onrender.com/api/fact-check",
        {
          newsContent: inputValue,
        }
      );

      if (response.data.success && response.data.data.length > 0) {
        // Extract data correctly
        const { explanation, realPercentage, source } = response.data.data[0];

        setExplanation(explanation);
        setRealPer(realPercentage);
        setSource(source);
        setFlag(true); // Show the result section
      } else {
        console.error("Invalid response structure:", response.data);
        setFlag(false);
      }
    } catch (e) {
      console.error(e);
      setFlag(false); // Hide result on error
    }
  };

  return (
    <div className="div1-misinfo">
      <div className="div2-misinfo">
        <p className="para-misinfo">Enter info to check</p>
        <textarea
          ref={textAreaRef}
          className="input-misinfo"
          name="tdata"
          value={inputValue}
          onChange={handleChange}
          placeholder="Start typing..."
        />
        <button className="btn-misinfo" type="button" onClick={handleSubmit}>
          Submit
        </button>

        {flag && (
          <div className="div3-misinfo">
            <p className="para2-misinfo">Result</p>
            <p className="para3-misinfo">Explanation: {explanation}</p>
            <p className="para4-misinfo">Percentage of truness: {realper}%</p>
            <p className="para5-misinfo">Source: {source}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Misinfo;
