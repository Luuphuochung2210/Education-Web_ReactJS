import React, { Component, useContext, useRef, useState, } from "react";
import { EnvContext } from "../context/EnvContext";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ChangePassword() {
  const { users, login, envDispatch } = useContext(EnvContext);
  const email = useRef();
  const password = useRef();
  const newpassword = useRef();
  const confirmpassword = useRef();
  const history = useHistory();
    
  useEffect(() => {
      console.log(login)
  })

    useEffect(() => {
        axios
          .get(process.env.REACT_APP_API_URL + "/users", { credential: true })
          .then((res) => {
            envDispatch({ type: "SET_USERS", payload: res.data.data });
          });
          console.log(users)
      }, []);

      const handleChangePassword = () => {
          if(newpassword.current.value === confirmpassword.current.value){
            axios
            .put(
              process.env.REACT_APP_API_URL + "/users/changePassword",
              {
                email: email.current.value,
                password: password.current.value,
                newpassword: newpassword.current.value,
              },
              { credential: true }
            )
            .then((res) => {
              alert(res.data.mes);
              history.push("/");
            });
          } else {
            alert("Password not match")
          }
      }

      return (
        <div className="signin-page-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner" onSubmit={handleChangePassword}>
              <div className="row">
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Email"
                      ref={email}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      placeholder="Password"
                      ref={password}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      placeholder="New password"
                      ref={newpassword}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      ref={confirmpassword}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100" onClick={handleChangePassword}>Change Password</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
      )
}