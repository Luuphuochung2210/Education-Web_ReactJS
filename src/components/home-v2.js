import React, { useContext, useEffect } from "react";
import Navbar from "./global-components/navbar-v2";
import Banner from "./section-components/banner-v2";
import Intro from "./section-components/intro-v2";
import About from "./section-components/about-v2";
import FeaturedCourse from "./section-components/course-featured";
import SpecialArea from "./section-components/special-area";
import Price from "./section-components/price";
import Client from "./section-components/client";
import Event from "./section-components/event";
import Testimonial from "./section-components/testimonial-v2";
import LatestPost from "./blog-components/latest-news-v2";
import Footer from "./global-components/footer-v2";
import { EnvContext } from "./context/EnvContext";
import axios from "axios";

const HomeV2 = () => {
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


  return (
    <div>
      <Navbar />
      <Banner />
      <Intro />
      <About />
      <FeaturedCourse />
      <SpecialArea />
      <Price />
      <Client />
      <Event />
      <Testimonial />
      <LatestPost />
      <Footer />
    </div>
  );
};

export default HomeV2;
