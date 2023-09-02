import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoginFormImage from '../images/login.avif'
import { AiFillFacebook } from 'react-icons/ai'
import { AiFillTwitterSquare } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import { GlobalContext } from "../../Context/context";
import axios from "axios";
import Cookies from 'js-cookie'
// import { AppRoute } from "../../App";



function LoginProject() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { state, dispatch } = useContext(GlobalContext)

  const loginUser = (e) => {
    e.preventDefault();

    const payload = { email, password }
    console.log(payload)
    axios.post('/api/login', payload)
      .then((json) => {
        Cookies.set('token', json.data.token)
        dispatch({
          type: "USER_LOGIN",
          token: json.data.token
        })
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch((err) => {
        console.log(err.message)
        toast.error("Login failed. Please check your credentials.", {
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
                    <div className="m-2 text-center">
                      <h1>Welcome!</h1>
                    </div>
                    {/* Sing -in links */}
                    <p className="fw-bold m-2">
                      Sign in with
                      <div className="d-flex justify-content-around">
                        <span className="fa-3x m2" style={{ color: "#3b5998" }}><AiFillFacebook /></span>
                        <span className="fa-3x m2" style={{ color: "#00acee" }}><AiFillTwitterSquare /></span>
                        <span className="fa-3x m2" style={{ color: "#0072b1" }}><AiFillLinkedin /></span>
                      </div>

                    </p>
                    <div className="d-flex align-items-center">
                      <hr className="flex-grow-1 hr-bw" />
                      <div> OR </div>
                      <hr className="flex-grow-1 hr-bw" />
                    </div>
                    {/* Form Starts */}
                    {/* Here we apply some javaScript to store our data */}
                    <form className="m-2" onSubmit={loginUser}>
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

                        <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
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
                      <div className="row">
                        <div className="col-6">
                          <div className="form-check text-start">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"

                            >
                              Keep me logged in
                            </label>



                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <Link to='' className="text-success">Forgot Password?</Link>
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-outline-success form-control mt-3">Submit</button>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="fw-light">
                          Not a memeber?

                          <Link to='/signIn' className="p-2 text-success">Sign Up</Link>


                        </p>
                      </div>
                    </form>
                  </div>
                  {/* Form End */}
                  {/* Side image*/}
                  <div className="col-md-6">
                    <div>
                      <img
                        src={LoginFormImage} //image here
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

export default LoginProject;
