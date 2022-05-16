import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [load, setLoad] = useState(false);

    if ("Logged" === (localStorage.getItem('login'))) {
        history.push('/');
    }

    const HandleLogin = async () => {
        setError("");
        setMessage("");
        setLoad(true);
        if (username && password) {

            let formData =new URLSearchParams();
            formData.append("username",username);
            formData.append("password",password);
            
            
            await axios.post(process.env.REACT_APP_API_URL+"login", formData)
                .then((response) => {
                    console.log(response.data);
                    console.log("inn")
                    if (response.status === 200 || response.status === 304 && response.data.message !== "invalid") {
                        localStorage.setItem('username', response.data.username);
                        localStorage.setItem('login', "Logged");
                        localStorage.setItem('token', response.data.accessToken);
                        setLoad(false);
                        window.location.reload();
                        history.push('/');
                    }
                    else if (response.data.message === "invalid") {
                        setLoad(false);
                        setUsername("");
                        setPassword("");
                        setError("Invalid Credentials !!")
                    }
                })
                .catch((error) => {
                    setLoad(false);
                    setUsername("");
                    setPassword("");
                    console.log(error.message);
                    setError("An Error Occurred!!.\nPlease Try Again.")
                })

        }
        else {
            setError("Please Fill out ALL Fields!!")
            setLoad(false);
        }
    }
    return (
        <div style={{width:"100%",height:"100%"}}>
            <div className="page" style={{width:"100%",height:"100vh"}}>
                <div className='container'>
                    <MDBCard style={{width:500,margin:"0 auto"}}>
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5 " style={{ fontFamily: "Passion One, cursive" }}>
                                    <strong>Login</strong>
                                </h3>
                            </div>
                            <div>{error ? <Alert variant="danger">{error}</Alert> : ''}</div>
                            <div>{message ? <Alert variant="success">{message}</Alert> : ''}</div>
                            <MDBInput
                                label="Username"
                                group
                                type="text"
                                success="right"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                            <MDBInput
                                label="Password"
                                group
                                type="password"
                                containerClass="mb-0"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                            <div className="text-center mb-3">
                                <Button
                                    type="button"
                                    gradient="blue"
                                    rounded
                                    className="btn-block z-depth-1a"
                                    onClick={HandleLogin}
                                    disabled={!username || !password || load}
                                >
                                    <div>{load ? <div className="spinner-border text-success" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> : 'Sign in'}</div>
                                </Button>
                            </div>

                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
        </div>
    );
};

export default Login;