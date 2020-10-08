import React from 'react';
import './sign-up.css';

import {auth, getUserRefFromDB} from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            showError: false,
            errorMessage: '',
        }
    }

    handleChange = (e) => {
        const{name,value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {displayName,email,password,confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert('Passwords do not match. Try again!')
            return;
        }
        if (this.state.password.length < 6) {
            alert('Password should have at least 6 characters')
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);            

            await getUserRefFromDB(user,{displayName});
        } catch (error) {
            console.error(error);
            if(error.code === 'auth/email-already-in-use') {
                this.setState({showError: true,errorMessage:'Email already used. Try to sign in.'})
            }
        }
    }

    render() {
        return(
            <div className="sign-up-container">                    
                <div className="sign-form-box">
                    <h2 className="sign-subtitle">Create a new account</h2>
                    {this.state.showError ? <p className="error-message">{this.state.errorMessage}</p>
                    :null}
                    <form className="sign-up-form" onSubmit={this.handleSubmit}>
                        <div className="input-container">                                
                            <input type="text" 
                            name="displayName" 
                            value={this.state.displayName}
                            onChange={this.handleChange}
                            className="sign-in-input"
                            placeholder="bla"/>
                            <label className="input-label" htmlFor="first-name">your user name</label>
                        </div>
                        <div className="input-container">                                
                            <input type="email" 
                            name="email" 
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="sign-in-input"
                            placeholder="bla"/>
                            <label className="input-label" htmlFor="email">your email</label>
                        </div>                                
                        <div className="input-container">
                            <input type="password" 
                            name="password"
                            value={this.state.password} 
                            onChange={this.handleChange}
                            className="sign-in-input"
                            placeholder="bla"/>
                            <label className="input-label" htmlFor="password">create a password</label>
                        </div>
                        <div className="input-container">
                            <input type="password" 
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            className="sign-in-input"
                            placeholder="bla"/>
                            <label className="input-label" htmlFor="confirm-password">confirm password</label>
                        </div>
                        <button className="sign-in-btn" >Create Account</button>
                    </form>                   
                </div>
            </div>  
        )
    }
}

export default SignUp;