import React, { useState , useRef} from "react";
import { Dialog, Snackbar,TextField } from "@mui/material";
import axios from "axios";

function TrendInput(props) {
  const [isdailog, setisdailog] = useState(false);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const textAreaRef = useRef(null);

  function showDailog() {
    setisdailog(!isdailog);
  }

  const handleSubmit = async () => {
    // Select endpoint based on the category
    let endpoint = "";
    if (props.catgry === "news") {
      endpoint = "https://safecyber-api.onrender.com/api/tfake-create";
    } else if (props.catgry === "scams") {
      endpoint = "https://safecyber-api.onrender.com/api/tscam-create";
    }

    try {
      let response = await axios.post(endpoint, {
        headline: text,
        tcontent: content
      });
      if (response.data.success) {
        setSuccessMessage("Saved successfully!");
        setisdailog(false); // Close the dialog
        props.refreshData();
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dialogStyle = {
    marginTop: "12%",
    minHeight: "45%", // Use minHeight instead of fixed height
    width: "50%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column", // Ensure vertical stacking
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    borderRadius: 0,
    overflowY: "auto", // Enables vertical scrolling only when needed
    backgroundColor: "white",
    textAlign: "center",
  };

  const adjustHeight = (textAreaElement) => {
    textAreaElement.style.height = 'auto';  // Reset height to auto to calculate new height
    textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;  // Set new height based on content
  };

  return (
    <>
      <button className="raise" onClick={showDailog}>
        Raise a {props.catgry}
      </button>
      {isdailog && (
        <div className="trend-inp-main">
          <Dialog
            open={true}
            BackdropProps={{ style: { backgroundColor: "unset" } }}
            maxWidth={"md"}
            PaperProps={{ sx: dialogStyle }}
          >
        
        <textarea 
          className="textarea-com"
          style={{height:"60px"}}
          ref={textAreaRef}
          value={text}
          onChange={
            (e) => {setText(e.target.value) 
            adjustHeight(e.target);
                }
            }
          placeholder="Write Heading..."
        ></textarea>
        <textarea className="textarea-com"
          ref={textAreaRef}
          value={content}
          onChange={
              (e) => {setContent(e.target.value) 
                adjustHeight(e.target);
              }
            }
          placeholder="Write Explanation..."
        ></textarea>
            <button className="trend-scam-btn" onClick={handleSubmit}>
              Submit
            </button>
          </Dialog>
        </div>
      )}

      <Snackbar
        open={successMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
      />
    </>
  );
}

export default TrendInput;
