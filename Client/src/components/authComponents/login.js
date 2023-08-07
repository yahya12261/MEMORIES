import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import bgImg from "../../images/bg.jpg";
import $ from "jquery";
import authService from "../../Services/authServices/auth.service";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fullHeight = () => {
      $(".js-fullheight").css("height", $(window).height());
      if ($(window).width() < 768) {
        $("body").css("background-attachment", "scroll");
      } else {
        $("body").css("background-attachment", "fixed");
      }
    };
    fullHeight();
    $(window).resize(fullHeight);

    document.body.classList.add("img");
    document.body.classList.add("Cbody");
    document.body.classList.add("js-fullheight");
    document.body.style.backgroundImage = `url(${bgImg})`;

    return () => {};
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const handleShowPassword = () => {
    setShowPassword(true);
  };
  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || username.length < 6) {
      setErrorMsg("The username has wrong length.");
      if (!password || password.length < 6) {
        setErrorMsg("The username and password have wrong length.");
      }
    } else if (!password || password.length < 6) {
      if (!username || username.length < 6) {
        setErrorMsg("The username and password have wrong length.");
      } else {
        setErrorMsg("The password has wrong length.");
      }
    } else {
      let user = { Email: username, Pass: password };
      try {
        await authService.login(user).then(
          (res) => {
            navigate("/core");
          },
          (err) => {
            console.log(err.response.status);
            if (err.response.status === 401) {
              setErrorMsg("Email Or Password Invalid");
            } else if (err.response.status === 402) {
              setErrorMsg(
                `Your email has not been activated. Please go to your inbox and activate it.`
              );
            }
          }
        );
      } catch (err) {
        console.log(err);
      }

      console.log("Username:", username);
      console.log("Password:", password);
      console.log("POST API");
    }

    // Add logic to submit the form here
  };
  const handleUsernameChange = (event) => {
    setErrorMsg("");
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setErrorMsg("");
    setPassword(event.target.value);
  };

  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Login</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <form onSubmit={handleSubmit} className="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control password"
                      placeholder="Password"
                      onChange={handlePasswordChange}
                    />
                    <span
                      onClick={
                        showPassword ? handleHidePassword : handleShowPassword
                      }
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                    >
                      Sign In
                    </button>
                    <p style={{ color: "red" }}>{ErrorMsg ? ErrorMsg : ""}</p>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50 text-md-auto">
                      <span>
                        Don't have an account?
                        <hr></hr>
                        <Link to="/registration">Register here</Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
