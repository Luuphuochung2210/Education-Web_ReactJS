import React, { Component, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import parse from "html-react-parser";
import { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { EnvContext } from "../context/EnvContext";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function SignUP() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const roleRef = useRef();
  const { login, users, envDispatch } = useContext(EnvContext);
  const history = useHistory();
  const [role, setRole] = useState();
  const nationRef = useRef();
  const levelRef = useRef();
  const introRef = useRef();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users", { credential: true })
      .then((res) => {
        envDispatch({ type: "SET_USERS", payload: res.data.data });
      });

  }, []);

  const handleSignupUser = async (e) => {
    e.preventDefault();
    let data = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmpassword: confirmpasswordRef.current.value,
      role: roleRef.current.value,
      status: false,
    };

    try {
      if (
        firstnameRef.current.value !== "" &&
        lastnameRef.current.value !== "" &&
        emailRef.current.value !== "" &&
        passwordRef.current.value !== "" &&
        confirmpasswordRef.current.value !== ""
      ) {
        axios
          .post(
            process.env.REACT_APP_API_URL + "/users/Signup",
            {
              firstname: firstnameRef.current.value,
              lastname: lastnameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
              confirmpassword: confirmpasswordRef.current.value,
              role: roleRef.current.value,
              status: false,
            },
            { credential: true }
          )
          .then((res) => {
            envDispatch({ type: "SET_USERS", payload: users });
          });
        alert("Signup successfully");
        if (roleRef.current.value === "teacher") {
          axios.post(
            process.env.REACT_APP_API_URL + "/instructor/newInstructor",
            {
              id: login.id,
              nation: nationRef.current.value,
              level: levelRef.current.value,
              intro: introRef.current.value,
            },
            {credential: true}
          );
        }
        history.push("/sign-in");
      } else {
        alert("Please fill all the fields");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeRole = (e) => {
    console.log(roleRef.current.value);
    setRole(roleRef.current.value);
  };

  return (
    <div className="signup-page-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form
              className="signin-inner"
              onSubmit={(e) => handleSignupUser(e)}
            >
              <div className="row">
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="First Name"
                      ref={firstnameRef}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Last Name"
                      ref={lastnameRef}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input type="text" placeholder="Email" ref={emailRef} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      placeholder="Password"
                      ref={passwordRef}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      ref={confirmpasswordRef}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="single-input-inner style-bg-border"
                    style={{
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label style={{ fontWeight: "600" }}>Role</label>
                    <select
                      style={{ padding: "5px", border: "none" }}
                      ref={roleRef}
                      onChange={(e) => handleChangeRole(e)}
                      defaultValue="student"
                    >
                      <option disabled={true} value="">
                        --Choose--
                      </option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>
                </div>

                {/* TEACHER INFO  */}
                {role === "teacher" ? (
                  <>
                    <div className="col-12">
                      <div className="single-input-inner style-bg-border">
                        <input
                          type="text"
                          placeholder="Nationality"
                          ref={nationRef}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div
                        className="single-input-inner style-bg-border"
                        style={{
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <label style={{ fontWeight: "600" }}>Level</label>
                        <select
                          style={{ padding: "5px", border: "none" }}
                          ref={levelRef}
                        >
                          <option disabled={true} value="">
                            --Choose--
                          </option>
                          <option value="master">Master</option>
                          <option value="student">Adult</option>
                          <option value="kid">Kid</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="single-input-inner style-bg-border">
                        <textarea placeholder="Introduction" ref={introRef} />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100">Create Account</button>
                </div>
                <div className="col-12">
                  <span>By creating an account</span>
                  <a className="ml-2" href="signin.html">
                    <strong>Signin</strong>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
