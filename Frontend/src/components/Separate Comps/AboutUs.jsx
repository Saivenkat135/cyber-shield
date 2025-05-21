import "../styles/AboutUs.css";
import TwitterProfile from "./TwitterProfile";

function AboutUs() {
  return (
    <div className="meditation-timer-page">
      <header className="hero-section">
        <h1>🌿 Ayush Ecosystem</h1>
        <p>A Huge Ecosystem with Advanced features </p>
      </header>

      <section className="developers-section">
        <h2>The Code Commandos</h2>
        <p id="meet-the">Meet the team that made this project possible:</p>
        <div className="developer-cards">
          <div className="developer-card">
            <h3> Chaitanya Kadali </h3>
            <h3 id="role-abt"> (Team Lead , Full stack) </h3>
            <p>
              <ul id="listo">
                <li>🌍 Made Complete System design </li>
                <li>🤖 Developed the AI chatbot </li>
                <li>📊 Integrated the email API </li>
                <li>
                  ✔️ Implemented status tracker{" "}
                  <span style={{ color: "rgb(32, 129, 248)" }}> (backend)</span>
                </li>
                <li>Connected frontend-backend components. </li>
                <li>
                  🎯 Prediction feature{" "}
                  <span style={{ color: "rgb(32, 129, 248)" }}>
                    {" "}
                    (frontend)
                  </span>{" "}
                </li>
                <li>
                  Drug inspector dashboard{" "}
                  <span style={{ color: "rgb(32, 129, 248)" }}>
                    {" "}
                    (frontend)
                  </span>{" "}
                </li>
                <li>Hosted this platform on Vercel. </li>
              </ul>
            </p>
            <div style={{ padding: "15px" }}>
              {" "}
              <TwitterProfile userId={"Chaitanya_947"} />{" "}
            </div>
          </div>

          <div className="developer-card">
            <h3>Deva Ganesh Vatturi </h3>
            <h3 id="role-abt"> (Frontend) </h3>
            <p>
              <ul id="listo">
                <li> Led the frontend team to build interface </li>
                <li>
                  📝 Implemented editable forms, ✔️ status tracker{" "}
                  <span style={{ color: "rgb(32, 129, 248)" }}>
                    {" "}
                    (frontend)
                  </span>
                </li>
                <li>🌍 Contributed to System design </li>
                <li> implemented the token sessions</li>
                <li> Styled all components for a seamless UI. </li>
                <li>Developed startup dashboard</li>
                <li>Implemented the CAPTCHA Verification</li>
              </ul>
            </p>
            <div style={{ padding: "15px" }}>
              {" "}
              <TwitterProfile userId={"DevaGanesh1909"} />{" "}
            </div>
          </div>
          <div className="developer-card">
            <h3>Sai Venkat Kallepalli </h3>
            <h3 id="role-abt"> (Backend) </h3>
            <p>
              <ul id="listo">
                <li> 🔐 Secure authentication system with password hashing</li>
                <li> 📄 PDF validation for quality & compliance.</li>
                <li> Optimized data storage with MongoDB Atlas </li>
                <li> 📝 Implemented editable forms </li>
                <li>Implemented secured Token sessions</li>
                <li>
                  {" "}
                  Developed backend for user registration and login
                  authentication{" "}
                </li>
                <li>Implemented efficient MongoDB queries</li>
              </ul>
            </p>

            <div style={{ padding: "15px" }}>
              {" "}
              <TwitterProfile userId={"SaiVenkat__135"} />{" "}
            </div>
          </div>
          <div className="developer-card">
            <h3>Ram Sai Kolli</h3>
            <h3 id="role-abt"> (Frontend) </h3>
            <p>
              <ul id="listo">
                <li> sign-up forms & Dashboard for doctor</li>
                <li> Developed image slide show for Home page</li>
                <li> Implemented FAQs and styled some components</li>
                <li> Implemented phone no. & pin validations </li>
              </ul>
            </p>

            <div style={{ padding: "15px" }}>
              {" "}
              <TwitterProfile userId={"Ram_kolli369"} />{" "}
            </div>
          </div>
          <div className="developer-card">
            <h3>Sai Nagendra Thota </h3>
            <h3 id="role-abt"> (Frontend) </h3>
            <p>
              <ul id="listo">
                <li> Built farmer dashboard</li>
                <li> implemented password validations </li>
                <li>
                  {" "}
                  Provided valuable ideas during the features development{" "}
                </li>
              </ul>
            </p>
            <p style={{ padding: "25px" }}>
              {" "}
              <span style={{ color: "rgb(32, 129, 248)", padding: "0px" }}>
                {" "}
                mail{" "}
              </span>{" "}
              : sainagendra236@gmail.com
            </p>
          </div>
          <div className="developer-card">
            <h3>Lakshmi Prasanna kada</h3>
            <h3 id="role-abt"> (Frontend) </h3>
            <p>
              <ul id="listo">
                <li> contributed to FAQs</li>
                <li> styled login and signup pages </li>
                <li> Helped with documentation </li>
              </ul>
            </p>
            <p style={{ padding: "25px" }}>
              {" "}
              <span style={{ color: "rgb(32, 129, 248)", padding: "0px" }}>
                {" "}
                mail{" "}
              </span>{" "}
              : klnvprasanna@gmail.com
            </p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>What's Special About Our Application?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>🤖 AI Chatbot Support</h3>
            <p>Real-time user assistance to address their queries. </p>
          </div>
          <div className="feature-card">
            <h3>📊 Real-Time Email Alerts</h3>
            <p>
              Transparent status tracking and automated email notifications.
            </p>
          </div>
          <div className="feature-card">
            <h3>📄 Automated PDF Verification</h3>
            <p>Ensures document quality and compliance using OpenCV4Node. </p>
          </div>
          <div className="feature-card">
            <h3>🌍 Self-Sustainable Ecosystem</h3>
            <p>
              Dashboards that connect Ayurvedic startups with nearby farmers and
              doctors for raw materials and product distribution.{" "}
            </p>
          </div>
          <div className="feature-card">
            <h3>🔐 Encrypted Data Handling </h3>
            <p>Secure data submission with automated compliance checks.</p>
          </div>

          <div className="feature-card">
            <h3> ✅ Authorized communication</h3>
            <p>
              Controlled communication, allowing startups to send messages once
              every three days to the Licensing Authority.
            </p>
          </div>
          <div className="feature-card">
            <h3>🎯 Prediction &📍 Recommendations </h3>
            <p>
              Predicts whether a startup project will be selected . Suggests
              doctors and farmers based on state and district locations.
            </p>
          </div>
          <div className="feature-card">
            <h3>📝 Editable Application Forms </h3>
            <p>
              {" "}
              Allow users to modify and update their submissions based on the
              feedback.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer-abt">
        <p>
          🚀 Join us in embracing the Ecosystem of ayush to embrace the ayush
          startups
        </p>
      </footer>
    </div>
  );
}

export default AboutUs;
