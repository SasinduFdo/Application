import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBAlert,
  MDBRow,
  MDBCol,
} from "mdbreact";
import axios from "axios";
import "./Registration.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import Authentication from "../../services/Authentication";
const regexp = /^(\w+\S+)$/;

const UserRegister = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  if ("Logged" !== localStorage.getItem("login")) {
    history.push("/Login");
  }

  const HandleRegister = async () => {
    setError("");
    setMessage("");
    setLoad(true);
    if (username && password) {
      let formData =new URLSearchParams();
      formData.append("username",username);
      formData.append("password",password);

      await axios
        .post(process.env.REACT_APP_API_URL + "register", formData, { headers: Authentication() })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200 && response.data.message === "saved") {
            setLoad(false);
            setUsername("");
            setPassword("");
            setMessage("Account Created Successfully.");
          }
          else if(response.status === 200 && response.data.message === "username taken")
          {
            setLoad(false);
            setUsername("");
            setPassword("");
            setError("Username already taken!!");
          } 
          else if (response.data.message === "error") {
            setLoad(false);
            setUsername("");
            setPassword("");
            console.log(error.message);
            setError("An Error Occurred!!.\nPlease Try Again.");
          }
        })
        .catch((error) => {
          setLoad(false);
          setUsername("");
          setPassword("");
          console.log(error.message);
          setError("An Error Occurred!!.\nPlease Try Again.");
        });
    } else {
      setError("Please Fill out ALL Fields!!");
      setLoad(false);
    }
  };

  return (
    <>
      <div className="page">
        <div className="container">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3
                  className="dark-grey-text mb-5 "
                  style={{ fontFamily: "Passion One, cursive" }}
                >
                  <strong>Registration</strong>
                </h3>
              </div>
              <div>{error ? <Alert variant="danger">{error}</Alert> : ""}</div>
              <div>
                {message ? <Alert variant="success">{message}</Alert> : ""}
              </div>

              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label="Username"
                    group
                    type="text"
                    success="right"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label="Password"
                    group
                    type="password"
                    success="right"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </MDBCol>
              </MDBRow>

              <div className="text-center mb-3">
                <Button
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  onClick={HandleRegister}
                  disabled={
                    !username ||
                    !password ||
                    load ||
                    !regexp.test(username) ||
                    !regexp.test(password)
                  }
                >
                  <div>
                    {load ? (
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </div>
                </Button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
