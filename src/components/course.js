import React from "react";
import Navbar from "./global-components/navbar-v4";
import PageHeader from "./global-components/page-header";
import Course from "./section-components/course-page";
import Footer from "./global-components/footer";
import { EnvContext } from "../components/context/EnvContext";
import { useContext } from "react";
import SingInPage from "./sign-in";

export default function AboutPage() {
  const { login, envDispatch } = useContext(EnvContext);

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
