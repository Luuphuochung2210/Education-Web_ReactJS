import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function SignUP() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const roleRef = useRef();

  const ref = collection(firestore, "users");

  const handleSignupUser = async(e) => {
    e.preventDefault();
    // console.log(
    //   firstnameRef.current.value,
    //   lastnameRef.current.value,
    //   emailRef.current.value,
    //   passwordRef.current.value,
    //   confirmpasswordRef.current.value,
	//   roleRef.current.value
    // );

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
		addDoc(ref,data);
	} catch (e) {
		console.log(e);
	}
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
                    <label style={{fontWeight: "600"}}>Role</label>
                    <select style={{padding: "5px", border: "none"}} ref={roleRef}>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>
                </div>
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
