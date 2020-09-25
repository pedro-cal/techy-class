import React from 'react';
import './login.css';

import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

class LogIn extends React.Component {
   
    render() {
        return (
            <div className="main-container">
                <div className="logo">Techy Class</div>
                <div className="sign-in-up-container">
                    <SignIn />
                    <SignUp />
                </div>           
            </div>            
        )
    }
} 
export default LogIn;