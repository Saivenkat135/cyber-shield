const express=require("express");
const mongoose=require("mongoose")
const PORT=5000;
const app=express();

require("dotenv").config(); // to access the values .env file

const user=require("./routes/userRoute");


//MongoDB Atlas Connection
try {
    const mongoUri = process.env.MONGO_API;
  
    if (!mongoUri) {
      console.error("MongoDB URI not defined in .env file.");
      process.exit(1);
    }
  
    mongoose
      .connect(mongoUri)
      .then(() => {
        console.log("Connected to MongoDB Atlas CLOUD !!");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB Atlas:", error);
      });
  } catch (e) {
    console.log("cloud connecting error");
  }

app.use("/api",user);

// Serve the static files (HTML, CSS, JS)
app.use(express.static("public"));
// to display (serve) html ( to make sure that the server is running when HOSTED)
app.get(["/", "/api"], (req, res) => {
  try {
    res.sendFile(__dirname + "/public/index.html");
  } catch (e) {
    console.log("erorrrrr", e);
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
module.exports = app;
  