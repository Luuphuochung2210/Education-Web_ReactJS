import React, { useEffect } from "react";
import Navbar from "./global-components/navbar-v4";
import PageHeader from "./global-components/page-header";
import SignIn from "./section-components/sign-in";
import Footer from "./global-components/footer";
import { EnvContext } from "./context/EnvContext";
import { useContext } from "react";
import axios from "axios";

const SingInPage = () => {
  const { users, envDispatch } = useContext(EnvContext);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users", { credential: true })
      .then((res) => {
        envDispatch({ type: "SET_USERS", payload: res.data.data });
      });
  }, []);
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Sign In" />
      <SignIn />
      <Footer />
    </div>
  );
};

export default SingInPage;
