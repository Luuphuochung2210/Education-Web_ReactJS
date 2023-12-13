import React, { Component } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import HomeV2 from "./components/home-v2";
import HomeV3 from "./components/home-v3";
import Course from "./components/course";
import CourseDetails from "./components/course-details";
import About from "./components/about";
import Event from "./components/event";
import EventDetails from "./components/event-details";
import Instructor from "./components/instructor";
import InstructorDetails from "./components/instructor-details";
import Pricing from "./components/pricing";
import Gallery from "./components/gallery";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import Contact from "./components/contact";
import Blog from "./components/blog";
import BlogDetails from "./components/blog-details";
import Managing from "./components/manage";
import ChangePasswordPage from "./components/changepassword";
import Home_V3 from "./components/home-v3";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { EnvContext } from "./components/context/EnvContext";

export default function App() {
  const { users, login, envDispatch, allcourses } = useContext(EnvContext);
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
            id: newInfo[0]._id,
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
  return (
    <HashRouter basename="/">
      <div>
        <Switch>
          <Route exact path="/" component={HomeV2} />
          <Route path="/home-v3" component={Home_V3} />
          <Route path="/course" component={Course} />
          <Route path="/course-details" component={CourseDetails} />
          <Route path="/about" component={About} />
          <Route path="/event" component={Event} />
          <Route path="/event-details" component={EventDetails} />
          <Route path="/instructor" component={Instructor} />
          <Route path="/instructor-details" component={InstructorDetails} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog-details" component={BlogDetails} />
          <Route path="/manage" component={Managing} />
          <Route path="/changepassword" component={ChangePasswordPage} />
        </Switch>
      </div>
    </HashRouter>
  );
}
