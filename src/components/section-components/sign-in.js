import React, { Component, useContext, useRef, useState, } from "react";
import { EnvContext } from "../context/EnvContext";
export default function Signin() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const { users, login, envDispatch } = useContext(EnvContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem(
      "data",
      JSON.stringify({
        user: emailRef.current.value,
        pwd: passwordRef.current.value,
      })
    );
    var logacc = users.filter(
      (user) =>
        user.email == emailRef.current.value &&
        user.password == passwordRef.current.value
    );
    if (logacc.length == 0) {
      alert("Wrong email or password");
    } else {
      envDispatch({
        type: "SET_LOGIN",
        payload: {
          firstname: logacc[0].firstname,
          lastname: logacc[0].lastname,
          username: logacc[0].username,
          email: logacc[0].email,
          role: logacc[0].role,
          status: true,
        },
      });
    }

    console.log(login);
  };

  return (
    <div className="signin-page-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner" onSubmit={(e) => handleLogin(e)}>
              <div className="row">
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Email"
                      ref={emailRef}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      placeholder="Password"
                      ref={passwordRef}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100">Sign In</button>
                </div>
                <div className="col-12">
                  <a href="#">Forgotten Your Password</a>
                  <a className="ml-2" href="signup.html">
                    <strong>Signup</strong>
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
