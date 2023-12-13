import React from "react";
import Navbar from "./global-components/navbar-v4";
import PageHeader from "./global-components/page-header";
import Course from "./section-components/course-page";
import Footer from "./global-components/footer";
import { EnvContext } from "../components/context/EnvContext";
import { useContext } from "react";
import SingInPage from "./sign-in";
import { useEffect } from "react";
import axios from "axios";

export default function AboutPage() {
  const { users, login, envDispatch } = useContext(EnvContext);
  const info = JSON.parse(localStorage.getItem("data"));

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
      <PageHeader headertitle="Courses" />
      <Course />
      <Footer />
    </div>
  ) : (
    <SingInPage></SingInPage>
  );
}
