import React, { Component, useRef, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { firestore } from "../../firebase";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";

export default function Signin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [account, setAccount] = useState([]);


  const ref = collection(firestore, "users");

//   useEffect(() => {
	
    
//   },[ref]);

  const handleLogin = async (e) => {
	const getData = async () => {
		const dbUsers = await getDocs(ref);
		setAccount(dbUsers.docs.map((doc) => ({ ...doc.data(), id: doc.user })));
	  };
	  getData();
	  const temp = account.map((user) => user.email);
	  console.log(temp);
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
                    <input type="text" placeholder="Name" ref={usernameRef} />
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
