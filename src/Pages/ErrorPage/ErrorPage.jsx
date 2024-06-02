import { useNavigate, useRouteError } from "react-router-dom";
import errorImage from "../../assets/error.gif";
import "./ErrorPage.css";

  

const ErrorPage = () => {
    const error = useRouteError();
  const navigate = useNavigate();
  const goToHomeHandler = () => {
    navigate("/");
  };
    return (
        <div className="error-area">
        <div>
          <img src={errorImage} alt="Error Image" />
          <p className="error-text">{error.statusText || error.message}</p>
          <div className="text-center">
            <button className="error-button" onClick={goToHomeHandler}>
              Go To Home
            </button>
          </div>
        </div>
      </div>
    );
};

export default ErrorPage;