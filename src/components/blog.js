import React from "react";
import Navbar from "./global-components/navbar-v4";
import PageHeader from "./global-components/page-header";
import Blog from "./blog-components/blog";
import Footer from "./global-components/footer";
import { useContext } from "react";
import { EnvContext } from "./context/EnvContext";
import { useEffect } from "react";
import axios from "axios";

const SingUpPage = () => {
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
      <PageHeader headertitle="Blog" />
      <Blog />
      <Footer />
    </div>
  );
};

export default SingUpPage;
