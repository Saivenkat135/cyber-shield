import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import Main from "./components/Main.jsx";
import AiChatBot from "./components/Hero comps/AiChatBot.jsx";
import AboutUs from "./components/Separate Comps/AboutUs.jsx";
import Header from "./components/Header.jsx";
import Register from "./components/Register.jsx";
import Rough from "./components/Rough.jsx";
import YourProfile from "./components/YourProfie.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<YourProfile />} />
          <Route path="/chatbot" element={<AiChatBot />} />
          <Route
            path="/aboutus"
            element={
              <div>
                {" "}
                <Header /> <AboutUs />{" "}
              </div>
            }
          />
          <Route path="/rough" element={<Rough />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
