import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, TextField, Card, CardMedia, CardContent, Avatar, Paper } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
// CSS-in-JS Variables
const styles = {
    pageBackground: "#121212",
    primaryColor: "#00c853",
    secondaryColor: "#00e676",
    textColor: "#ffffff",
    cardBackground: "#1e1e1e",
    borderRadius: "16px",
    boxShadow: "0px 10px 30px rgba(0, 200, 83, 0.3)",
  };
  
  const StyledContainer = styled(Container)({
    backgroundColor: styles.pageBackground,
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });
  
  const PostCard = styled(Card)({
    maxWidth: 600,
    width: "100%",
    margin: "20px auto",
    backgroundColor: styles.cardBackground,
    color: styles.textColor,
    borderRadius: styles.borderRadius,
    boxShadow: styles.boxShadow,
  });
  
  const StyledButton = styled(Button)({
    background: `linear-gradient(45deg, ${styles.primaryColor}, ${styles.secondaryColor})`,
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "30px",
    transition: "0.3s",
    '&:hover': {
      transform: "scale(1.05)",
    },
  });
  
  const InputContainer = styled(Paper)({
    backgroundColor: styles.cardBackground,
    padding: "20px",
    borderRadius: styles.borderRadius,
    boxShadow: styles.boxShadow,
    width: "100%",
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

export default function SocialMedia({email}) {
    const [posts, setPosts] = useState([
        {
          username: "",
          userProfileImage: "",
          text: "",
          imageUrl: "",
        },
        // {
        //   username: "Jane Smith",
        //   userProfileImage: "https://via.placeholder.com/50",
        //   text: "Loving this new platform! 🌿",
        //   imageUrl: "https://via.placeholder.com/400",
        // },
      ]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [comp, setComp] = useState(1);
  const [url, setUrl] = useState(`/getpublic`);

  useEffect(() => {
    // /get-image-post
    const getYourPosts = async() => {
           
      try{
          await axios.post('https://safecyber-api.onrender.com/api/get-image-post',{image}).then(res=>{
             if(res.data.success){
                 
             console.log("conversation.jsx : const messages -> ",res.data.msgs)
         
          setMessage(res.data.msgs)
             }else{
               alert("Error : to retrieve getmsg");
             }
               })                    
       }
       catch(error){
           console.log('Error sending registration request',error);
       }
  }
  getYourPosts();     
  }, [url]);


  const handlePost = async () => {
    try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("matter", text);
        formData.append("email", email);
 
        const response = await axios.post("https://safecyber-api.onrender.com/api/upload-image-post",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } } // re-checkkkk Ensure correct headers
        );
        console.log("resp sm -> ",response.data);
        if (response.data.success) {
          setText("");
          setImage(null);
        }else{
          console.log("response.data -> ", response.data);
        }
    } catch (error) {
          console.error("Error while uploading file", error);
    }
  };

  const handlePublic = async () => {
    setComp(1);
    try {
      const response = await axios.post("https://safecyber-api.onrender.com/api/get-all-posts");

      console.log(response.data.images);
      
      if (response.data.images) {
        setPosts(
          response.data.images.map((post) => ({
            username: post.name, // Placeholder, as API does not return username
            userProfileImage: "https://via.placeholder.com/50", // Placeholder image
            text: post.matter, // Assign API's "matter" field to "text"
            imageUrl: post.image, // Assign Base64 image
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  
   const handleProfile =async ()=>{
    setComp(2);
    try {
      const response = await axios.post("https://safecyber-api.onrender.com/api/get-image-post", {
        email: email, // Send email in request body
      });

      console.log(response.data.images);
      
      if (response.data.images) {
        setPosts(
          response.data.images.map((post) => ({
            username: "Anonymous", // Placeholder, as API does not return username
            userProfileImage: "https://via.placeholder.com/50", // Placeholder image
            text: post.matter, // Assign API's "matter" field to "text"
            imageUrl: post.image, // Assign Base64 image
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h3" color={styles.textColor} align="center" style={{ fontFamily: 'CursiveStyledMN' }} gutterBottom>
        Social Media Feed
      </Typography>
          
      <div className="sm-nav">
        <p onClick={handlePublic} className={comp === 1 ? "active-tab" : ""}  >Public</p>
        <p onClick={handleProfile} className={comp === 2 ? "active-tab" : ""} >Your Profile</p>
      </div>
          
      <InputContainer>
        <TextField
          label="Write something..."
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#bbb" } }}
          InputProps={{ style: { color: "#fff" } }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <label htmlFor="fileInput">
       <div className="media-pic-sm"></div>
      </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"    // --------------------> may save backend 
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "10px", color: "#fff", display: "none" }}
        />
        <StyledButton onClick={handlePost}>Post</StyledButton>
      </InputContainer>

      {posts.map((post, index) => (
        <PostCard key={index}>
            <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar src={post.userProfileImage} alt={post.username} sx={{ marginRight: 2, width: 50, height: 50 }} />
                  <Typography variant="h6" color={styles.textColor}>{post.username}</Typography>
                </Box>
            </CardContent>

            
            <CardContent>
                    <Typography variant="body1" color={styles.textColor}>{post.text}</Typography>
            </CardContent>
            
            {/* <CardMedia component="img" height="300" image={post.imageUrl} alt="Post" style={{ borderRadius: "10px" }} /> */}
            <CardMedia component="img" height="300" image={post.imageUrl} alt="Post"  style={{ borderRadius: "10px" }}/>

          
        </PostCard>
      ))}
    </StyledContainer>
  );
}
