import "../styles/Media.css";
import axios from "axios";
import { AttachFile } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useState, useEffect } from "react";

const ClipIcon = styled(AttachFile)`
  height: 40px;,
  cursor:'pointer'
`;

const Media = () => {
  const [sdata, setSdata] = useState("");
  const [flag, setFlag] = useState(true);
  const [value, setValue] = useState();
  const [file, setFile] = useState(null); // Ensure it starts as null

  const uploadFileToGemini = async (data) => {
    try {
      const data = new FormData();
      data.append("image", file);
      const response = await axios.post(
        "https://safecyber-api.onrender.com/api/contsensor-image",
        data,
        { headers: { "Content-Type": "multipart/form-data" } } // Ensure correct headers
      );
      console.log("File Upload Response: ", response.data);
      if (response.data.success) {
        setSdata(response.data.message);
      } else {
        setSdata(response.data.message + response.data.reason);
      }
      return response;
    } catch (error) {
      console.error("Error while uploading file", error);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (!file) return; // Prevent execution if no file is selected

      const data = new FormData();
      data.append("image", file); //  Use "image" instead of "file"

      console.log("Uploading file:", file.name);

      try {
        const response = await uploadFileToGemini(data);
        console.log("Upload response:", response?.data);
      } catch (error) {
        console.error("Error while uploading file:", error);
      }
    };

    getImage();
  }, [file]); // Only runs when `file` changes

  const handleChange = (e) => {
    setData(e.target.value);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://safecyber-api.onrender.com/api/contsensor-text",
  //       { text: tdata } // Send as JSON object
  //     );
  //     if (response.data.success) {
  //       setSdata(response.data.sdata);
  //       setFlag(true);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      setValue(e.target.files[0].name);
      setFile(e.target.files[0]); // Set file state, triggering useEffect
      console.log("File selected:", e.target.files[0]);
    }
  };

  return (
    <>
    <div className="text-main">
      <label htmlFor="fileInput">
       <div className="media-pic"></div>
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
      {file && (
        <p
          style={{ marginTop: "10px", marginBottom: "0px", fontWeight: "bold" }}
        >
          Selected File: {file.name}
        </p>
      )}
      <button className="text-btn" onClick={uploadFileToGemini}>
        Submit
      </button>
    
    </div>
      
      {flag && (
        <div className="media-res">
          <p>{sdata}</p>
        </div>
      )}
      </>
  );
};

export default Media;
