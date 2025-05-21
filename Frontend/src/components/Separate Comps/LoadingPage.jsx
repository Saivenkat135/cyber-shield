import "../styles/LoadingPage.css";

const LoadingPage = ({ text }) => {
  // you can give text = submitting data,
  // loading... please wait.. etc u like
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loader"></div>
        <div className="loading-text">{text}</div>
      </div>
    </div>
  );
};

export default LoadingPage;
