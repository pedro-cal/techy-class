import React from 'react';
import {Link} from 'react-router-dom';
import './sign-in.css';

import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return(
            <div className="sign-in-container">
                <div className="sign-in-form-box">
                    <form className="sign-in-form" >
                        <input type="email" className="sign-in-input"
                        placeholder='your e-mail'/>
                        <input type="password" className="sign-in-input"
                        placeholder='your password'/>
                        <button className="sign-in-btn">Sign In</button>
                        <img alt="Sign In Wigh Google" 
                        src='./images/google-sign-in/btn_google_signin_dark_normal_web@2x.png' 
                        id="google-sign-in-btn"
                        onClick={signInWithGoogle}/>
                    </form>
                    <p className="sub-btn-text">Don't have an account?</p>
                    <Link className="sign-up-link" to="/sign-up">Sign up here.</Link>
                </div>
            </div>            
        )
    }
}

export default SignIn;