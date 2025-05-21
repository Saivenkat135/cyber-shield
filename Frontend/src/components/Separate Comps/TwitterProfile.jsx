import "../styles/TwitterProfile.css";
import oldTwitterIcon from "../../assets/tw-bird.svg";
import newTwitterIcon from "../../assets/tw-x.svg";

const TwitterProfile = ({ userId }) => {
  const openTwitterProfile = () => {
    window.open(`https://x.com/${userId}`, "_blank");
  };

  return (
    <div className="twitter-profile" onClick={openTwitterProfile}>
      <img
        src={oldTwitterIcon}
        alt="Old Twitter Icon"
        className="twitter-icon"
      />
      <img
        src={newTwitterIcon}
        alt="New Twitter Icon"
        className="twitter-icon"
      />
      <span className="twitter-id">@{userId}</span>
    </div>
  );
};

export default TwitterProfile;
