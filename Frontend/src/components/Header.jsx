import React, { useEffect, useState } from "react";
import "./styles/Header.css";

export default function Header({ email ,pro=false}) {
  const [profile, setProfile] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added missing state
  const [profile_image, setProfileImage] = useState("");

  function goregister() {
    window.location.href = `/register`;
  }

  function gologin() {
    window.location.href = `/login`;
  }

  function gohome() {
    window.location.href = `/`;
  }

  function handleProfile() {
    window.location.href = `/profile?email=${encodeURIComponent(email)}`;
  }

  let flag = !email;

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5002/api/get-profile-image?email=${email}`, {
        method: "GET",
      })
        .then((response) => response.blob()) // Convert response to an image blob
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob); // Create a URL for the image
          setProfile(imageUrl); // Store the image URL in state
          console.log(imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching profile image:", error);
        });
    }
  }, [email]); // Runs whenever `email` changes

  return (
    <div className="home-head">
      <div className="home-first">
        <div className="outer-img">
          <div className="home-img"></div>
        </div>

        <p className="home-name" onClick={gohome}>
          SafeCyber
        </p>
      </div>
      <div>
        {flag ? (
          <>
            <button className="heads-signup" onClick={goregister}>
              Signup
            </button>
            <button className="heads-login" onClick={gologin}>
              Login
            </button>
          </>
        ) : (
          <label onClick={handleProfile}>
            {profile && <img src={profile} alt="Profile" className="profile" />}
          </label>
        )}
      </div>
    </div>
  );
}
