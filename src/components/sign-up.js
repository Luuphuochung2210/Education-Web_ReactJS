import React, { useContext, useEffect } from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/page-header';
import SignUp from './section-components/sign-up';
import Footer from './global-components/footer';
import axios from 'axios';
import { EnvContext } from './context/EnvContext';

const SingUpPage = () => {
    const { users, envDispatch } = useContext(EnvContext);
    useEffect(() => {
        axios
          .get(process.env.REACT_APP_API_URL + "/users", { credential: true })
          .then((res) => {
            envDispatch({ type: "SET_USERS", payload: res.data.data });
          });
      }, []);

    return <div>
        <Navbar />
        <PageHeader headertitle="Sign Up"  />
        <SignUp />
        <Footer />
    </div>
}

export default SingUpPage

