import React from 'react';
import './sign-in.css';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',            
        }
    }

    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({[name]: value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email,password} = this.state;

        await auth.signInWithEmailAndPassword(email,password);
    }

    render() {
        return(
            <div className="sign-in-container">                    
                <div className="sign-form-box">
                    <h2 className="sign-subtitle">Sign In</h2>
                    <form className="sign-in-form" onSubmit={this.handleSubmit} >
                        <div className="input-container">                                
                            <input 
                                type="email" 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                className="sign-in-input"
                                placeholder="bla"
                            />
                            <label className="input-label" htmlFor="email">your email</label>
                        </div>
                        <div className="input-container">
                            <input 
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="sign-in-input"
                            placeholder="bla"/>
                            <label className="input-label" htmlFor="password">your password</label>
                        </div>
                        <button className="sign-in-btn">Sign In</button>
                        <img alt="Sign In Wigh Google" 
                        src={process.env.PUBLIC_URL + '/images/google-sign-in/btn_google_signin_dark_normal_web2x.png'}
                        id="google-sign-in-btn"
                        onClick={signInWithGoogle}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn;