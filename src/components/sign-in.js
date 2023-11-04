import React from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/page-header';
import SignIn from './section-components/sign-in';
import Footer from './global-components/footer';
import { EnvContext } from './context/EnvContext';
import { useContext } from 'react';


const SingInPage = () => {
    const { account } = useContext(EnvContext);
    return <div>
        <Navbar setting = {account}/>
        <PageHeader headertitle="Sign In"  setting = {account}/>
        <SignIn setting = {account}/>
        <Footer />
    </div>
}

export default SingInPage

