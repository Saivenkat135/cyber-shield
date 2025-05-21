import "./styles/Main.css";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero comps/Hero";
import { useLocation } from "react-router-dom";
function Main() {
  const handleAbout = () => {
    window.location.href = "/aboutus";
  };
  const location = useLocation();  // Get the current location
  const params = new URLSearchParams(location.search);  // Use location.search instead of window.location.search
  const email = params.get("email");
  console.log(email);
  return (
    <div className="the-home">
      <Header email={email}/>
      <Hero email={email}/>
      <Footer />
    </div>
  );
}
export default Main;
