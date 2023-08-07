import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import bgImg from "../../images/bg.jpg";
import $ from "jquery";
import authService from "../../Services/authServices/auth.service";
import { Button, Modal } from "react-bootstrap";
const Registration = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fullHeight = () => {
      if ($(window).height() > 800)
        $(".js-fullheight").css("height", $(window).height());
      else $(".js-fullheight").css("height", $(window).height() * 1.5);
      // console.log($(window).height());
    };
    fullHeight();
    $(window).resize(fullHeight);
    document.body.classList.add("img");
    document.body.classList.add("Cbody");
    document.body.classList.add("js-fullheight");
    document.body.style.backgroundImage = `url(${bgImg})`;
    return () => {};
  }, []);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [EmailUsed, setEmailUsed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handlLogin() {
    navigate("/login");

    setShowModal(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      Email: email,
      Pass: password,
      First: firstName,
      Middle: middleName,
      Last: lastName,
      Dob: dateOfBirth,
    };
    try {
      await authService.signup(user).then(
        (response) => {
          setShowModal(true);
        },
        (error) => {
          if (error.response.status === 409) {
            setEmailUsed(true);
          }
        }
      );
    } catch (err) {
      // console.log(err);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleMiddleNameChange = (event) => {
    setMiddleName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailUsed(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }
    if (EmailUsed) {
      errors.email = "Email is Already Used";
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    return { isValid, errors };
  };

  const { errors, isValid } = validateForm();

  return (
    <div>
      <header>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center mb-5">
              <h2 className="heading-section">Register</h2>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="login-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="login-wrap p-0">
                  <h3 className="mb-4 text-center">Create a new account?</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                          />
                          {errors.firstName && (
                            <div className="invalid-feedback d-block">
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Middle Name"
                            value={middleName}
                            onChange={handleMiddleNameChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleLastNameChange}
                          />
                          {errors.lastName && (
                            <div className="invalid-feedback d-block">
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <DatePicker
                        className="form-control"
                        placeholderText="Date of Birth"
                        selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}
                        dateFormat="MM/dd/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3"
                        disabled={!isValid}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <Modal show={showModal} onHide={handlLogin}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <i
                          className="fa fa-check-circle mr-2"
                          aria-hidden="true"
                        ></i>
                        Registered Successfully
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Congratulations! You have successfully registered.</p>
                      <p>Please check your email for registration details.</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handlLogin}>
                        Login
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default Registration;
