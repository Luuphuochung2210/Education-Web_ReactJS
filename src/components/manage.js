import React, { useEffect } from "react";
import Navbar from "./global-components/navbar-v4";
import PageHeader from "./global-components/page-header";
import Footer from "./global-components/footer";
import Manage from "./section-components/manage";
import { useContext } from "react";
import { EnvContext } from "./context/EnvContext";
import { useHistory } from "react-router-dom";
import HomeV2 from "./home-v2";
import axios from "axios";

const Managing = () => {
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
  

  return login.status == true && login.role == "admin" ? (
    <div>
      <Navbar />
      <PageHeader headertitle="Manage" />
      <Manage />
      <Footer />
    </div>
  ) : (
    <HomeV2 />
  );
};

export default Managing;
