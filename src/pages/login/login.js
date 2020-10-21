import React from 'react';
import './login.css';

import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

export const LogIn = () => (            
            <div className="login-container">                
                <div className="logo">Techy Class</div>
                <div className="sign-in-up-container">
                    <SignIn />
                    <hr className='form-divider'/>
                    <SignUp />
                </div>                                                              
            </div>            
    )
