import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/YourProfile.css";
import Header from "./Header";
const YourProfile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // const email = params.get("email");
  const [email, setEmail] = useState(params.get("email"));
  console.log("profile page email", email);

  const [profile, setProfile] = useState("");
  const [userData, setUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); 
  };

  useEffect(() => {
    // const fetchProfileImage = () => {
    if (email) {
      fetch(`http://localhost:5002/api/get-profile-image?email=${email}`, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setProfile(imageUrl); 
          console.log(imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching profile image:", error);
        });
    }
    // };
  }, [email]);

  const handleUploadProfileImage = () => {
    if (!selectedFile) {
      console.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("email", email); 
    formData.append("profile_image", selectedFile);

    fetch("http://localhost:5002/api/upload-profile-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Profile image uploaded successfully");
          console.log(data.data);
          
          setUserData(data.data);
          setEmail(data.data.email);
        } else {
          console.error("Upload failed:", data.message);
        }
      })
      .catch((error) => console.error("Error uploading image:", error));
  };
  return (
    <div className="profile-container">
      <Header email={email}/>
      <div className="profile-main">
        <img src={profile} alt="Profile" className="profile-image" />
        <div className="file-upload">
              <label className="custom-file-upload">
                  <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                  Choose File
              </label>

                <button className="upload-button" onClick={handleUploadProfileImage}>
                  {profile ? "Change Image" : "Upload Image"}
                </button>
        </div>

        <div className="userdata">
          {userData && (
            <>
              <h2>{userData.name}</h2>
              {/* <h2>Saivenkat135</h2> */}
              <p>Email: {email}</p>
              <ul>
                  {userData.chats?.map((chat, index) => (
                    <li key={index}>{chat}</li>
                  )) || <p>No chats available</p>}
               </ul>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
