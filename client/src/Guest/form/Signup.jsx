import React, { useState } from "react";
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import SignUpImage from '../images/1.jpg';
import axios from "axios";
// import { AppRoute } from "../../App";



function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")



    const signInUser = (e) => {
        e.preventDefault();

        const payload = { email, password, username }
        console.log(payload)
        axios.post('/api/signup', payload)
            .then((json) => {
                console.log(json.data)
                toast.success("SignUp successful!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate('/login')

            })
            .catch((err) => {
                console.log(err.message)
                toast.error("signUp failed. Please check your credentials.", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }


    return (
        <>
            <section className="bg-success bg-opacity-25 vh-100">
                <div className="d-flex flex column  justify-content-center align-items-center ">
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-sm-12 col-md-10 mx-auto bg-white shadow rounded">
                                <div className="row">
                                    <div className="col-md-6">
                                        {/* Welcome heading */}
                                        <div className="mt-3 text-center">
                                            <h1>Welcome to  Family</h1>
                                        </div>
                                        <p className="signText text-center text-muted">
                                            Welcome to the world of amazing products. Join our growing community of shoppers for online shopping like never before.
                                        </p>
                                        {/* Form Starts */}
                                        {/* Here we apply some javaScript to store our data */}
                                        <form className="m-2" onSubmit={signInUser}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="username">
                                                    Username
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />

                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleInputEmail1"
                                                    className="form-label"
                                                >
                                                    Email address
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    value={email}
                                                    autoComplete="off"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="password">
                                                    Password
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />

                                            </div>
                                            <div>
                                                <button className="btn btn-outline-success form-control mt-3">Sign In</button>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <p className="fw-light">
                                                    Already a memeber?

                                                    <Link to="/login" className="p-2 text-success">Login In</Link>


                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                    {/* Form End */}
                                    {/* Side image*/}
                                    <div className="col-md-6">
                                        <div>
                                            <img
                                                src={SignUpImage} //image here
                                                alt="login image"
                                                className="img-fluid py-3 my-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Signup;
