import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { EnvContext } from "../context/EnvContext";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function NavbarV2() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  let imgattr = "logo";
  let anchor = "#";

  const { users, login, envDispatch } = useContext(EnvContext);
  const info = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users", { credential: true })
      .then((res) => {
        envDispatch({ type: "SET_USERS", payload: res.data.data });
      });
  }, []);

  useEffect(() => {
    var newInfo = users;
    var data = JSON.parse(localStorage.getItem("data"));
    if (data !== null) {
      newInfo = newInfo.filter(
        (user) => user.email === data.email && user.password === data.password
      );

      if (newInfo.length) {
        envDispatch({
          type: "SET_LOGIN",
          payload: {
            email: newInfo[0].email,
            firstname: newInfo[0].firstname,
            lastname: newInfo[0].lastname,
            username: newInfo[0].username,
            role: newInfo[0].role,
            status: true,
          },
        });
      }
    }
  }, [users]);
  
  


  const handleLogout = (e) => {
    localStorage.clear();
    login.status = false;
    envDispatch({
      type: "SET_LOGIN",
      payload: login,
    });
  };

  return (
    <div className="navbar-area">
      <div className="navbar-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-md-left text-center">
              <ul>
                <li>
                  <p>
                    <i className="fa fa-map-marker" /> 7/1 Thành Thái, P.14,
                    Q.10, Tp.HCM
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-envelope-o" /> edumint@gmail.com
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="topbar-right text-md-right text-center">
                <li className="social-area">
                  <a href="#">
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-area-2 navbar-area navbar-expand-lg go-top">
        <div className="container nav-container">
          <div className="responsive-mobile-menu">
            <button
              className="menu toggle-btn d-block d-lg-none"
              data-target="#edumint_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-left" />
              <span className="icon-right" />
            </button>
          </div>
          <div className="logo">
            <Link to="/">
              <img src={publicUrl + "assets/img/logo-2.png"} alt="img" />
            </Link>
          </div>
          {login.status ? (
            <div className="nav-right-part nav-right-part-mobile">
              <label style={{ color: "white" }}>
                {"Hello " + login.firstname}
              </label>
              <Link
                className="signin-btn"
                to="/"
                onClick={(e) => handleLogout(e)}
              >
                Log out
              </Link>
              <Link className="signin-btn" to="/changepassword">
                <i className="fa fa-key" />
              </Link>

              <a className="search-bar" href="#">
                <i className="fa fa-search" />
              </a>
            </div>
          ) : (
            <div className="nav-right-part nav-right-part-mobile">
              <Link className="signin-btn" to="/sign-in">
                Sign In
              </Link>
              <Link className="btn btn-base" to="/sign-up">
                Sign Up
              </Link>
              <a className="search-bar" href="#">
                <i className="fa fa-search" />
              </a>
            </div>
          )}
          <div className="collapse navbar-collapse" id="edumint_main_menu">
            <ul className="navbar-nav menu-open">
              <li className="menu-item-has-children current-menu-item">
                <Link to="/">Home</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/">Home 02</Link>
                  </li>
                  <li>
                    <Link to="/home-v3">Home 03</Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <Link to="/course">Course</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/course">Course</Link>
                  </li>
                  {/* <li>
                    <Link to="/course-details">Course Single</Link>
                  </li> */}
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Pages</a>
                <ul className="sub-menu">
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/event">Event</Link>
                  </li>
                  <li>
                    <Link to="/event-details">Event Details</Link>
                  </li>
                  <li>
                    <Link to="/instructor">Instructor</Link>
                  </li>
                  <li>
                    <Link to="/instructor-details">Instructor Details</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                  {login.status ? (
                    <></>
                  ) : (
                    <>
                      <li>
                        <Link to="/sign-in">Sign In</Link>
                      </li>
                      <li>
                        <Link to="/sign-up">Sign Up</Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              <li className="menu-item-has-children">
                <Link to="/blog">Blog</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/blog-details">Blog Details</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              {login.status == true && login.role == "admin" ? (
                <li>
                  <Link to="/manage">Manage</Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
          {login.status ? (
            <div className="nav-right-part nav-right-part-desktop">
              <label style={{ color: "white" }}>
                {"Hello " + login.firstname}
              </label>
              <Link
                style={{ color: "white" }}
                className="signin-btn"
                onClick={(e) => handleLogout(e)}
                to="/"
              >
                Log out
              </Link>
              <Link className="signin-btn" to="/changepassword">
                <i style={{ color: "white" }} className="fa fa-key" />
              </Link>
              <a className="search-bar" href="#">
                <i style={{ color: "white" }} className="fa fa-search" />
              </a>
            </div>
          ) : (
            <div className="nav-right-part nav-right-part-desktop">
              <Link
                style={{ color: "white" }}
                className="signin-btn"
                to="/sign-in"
              >
                Sign In
              </Link>
              <Link className="btn btn-base" to="/sign-up">
                Sign Up
              </Link>
              <a className="search-bar" href="#">
                <i className="fa fa-search" />
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
