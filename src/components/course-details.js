import React, { useContext } from "react";
import Navbar from "./global-components/navbar-v4";
import PageHeader from "./global-components/page-header";
import CourseDetails from "./section-components/course-details";
import Footer from "./global-components/footer";
import { EnvContext } from "./context/EnvContext";
import SingInPage from "./sign-in";
import { useEffect } from "react";
import axios from "axios";

const AboutPage = () => {
  const { login, envDispatch, allcourses } = useContext(EnvContext);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/course", { credential: true })
      .then((res) => {
        envDispatch({ type: "SET_ALLCOURSES", payload: res.data.data });
      });

    //eslint-disable-next-line
  }, []);  

  return login.status ? (
    <div>
      <Navbar />
      <PageHeader headertitle="Courses Details" />
      <CourseDetails />
      <Footer />
    </div>
  ) : (
    <SingInPage></SingInPage>
  );
};

export default AboutPage;
