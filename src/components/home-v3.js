import React, { useEffect } from 'react';
import Navbar from './global-components/navbar-v3';
import Banner from './section-components/banner-v3';
import Intro from './section-components/intro-v3';
import About from './section-components/about-v3';
import FeaturedCourse from './section-components/course-featured-v2';
import AboutV4 from './section-components/about-v4';
import Counter from './section-components/counter';
import AboutV5 from './section-components/about-v5';
import Testimonial from './section-components/testimonial-v3';
import Team from './section-components/team-v2';
import Faq from './section-components/faq';
import Client from './section-components/client-v2';
import LatestPost from './blog-components/latest-news-v2';
import Footer from './global-components/footer-v2';
import { useContext } from 'react';
import { EnvContext } from './context/EnvContext';
import axios from 'axios';

const Home_V3 = () => {
    const { users, login, envDispatch } = useContext(EnvContext);

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
  },[]);

    return <div>
        <Navbar />
        <Banner />
        <Intro />
        <About />
        <FeaturedCourse />
        <AboutV4 />
        <Counter />
        <AboutV5 />
        <Testimonial />
        <Team />
        <Faq />
        <Client />
        <LatestPost />
        <Footer />
    </div>
}

export default Home_V3

