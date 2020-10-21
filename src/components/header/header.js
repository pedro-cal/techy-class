import React, {useState} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './header.css';

//* IMPORTING ICONS 
import {FaSignOutAlt as SignOutIcon} from 'react-icons/fa' ;
import {FaHome as HomeIcon} from 'react-icons/fa' ;
import {FaCoins as DollarIcon} from 'react-icons/fa';

import { auth } from '../../firebase/firebase.utils';

export const Header = (props) => {
    const [ currentUser ] = useState(props.currentUser);

    let history = useHistory();

    const handleSignOut = () => {
        auth.signOut();
        history.push("/login");
    }

    let userName;      
    if(currentUser !== null) {
        userName = currentUser.displayName;
        history.push("/home");
    }
    
    return(                            
        <div className="header-box">
            {currentUser === null ? 
            <Redirect to="/login"/> : null}
            <div className="header-logo">Techy Class</div>
            <div className="burger-menu">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </div>

            <div className="nav-user-box">
                <nav className="nav-box">
                    <Link className="menu-box" to="/home">
                        <div className="icon-box"><HomeIcon /></div>
                        <span className="menu-item">Home</span>
                    </Link>                        
                </nav>

                <div className="sign-in-menu">
                {currentUser ?                         
                    <div className="user-menu-box">
                        <span>
                            {userName}
                            {currentUser.userRole === 'student' ? 
                            <span className="credits">
                                <DollarIcon/>                                    
                                <span>{currentUser.credits}</span>
                            </span>                      
                            :null} 
                        </span>
                        <div className="sign-out-box" onClick={handleSignOut}>
                            <span id="sign-out-text">Sign Out</span>
                            <SignOutIcon/>
                        </div>
                    </div> : null
                }                                                              
                </div>
            </div>
        </div>            
    )
}



/*
class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.currentUser
        }
    }

    handleSignOut = () => {
        auth.signOut();
        useHistory().push("/login");
    }

    render() {
        var user = this.props.currentUser;        
        var userName;      
        if(user !== null) {
            userName = user.displayName;             
        }
        
        return(                            
            <div className="header-box">

                {this.state.currentUser === null ? 
                <Redirect to="/login"/> : null}
                <div className="header-logo">Techy Class</div>
                <div className="burger-menu">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                </div>
                <div className="nav-user-box">

                    <nav className="nav-box">
                        <Link className="menu-box" to="/home">
                            <div className="icon-box"><HomeIcon /></div>
                            <span className="menu-item">Home</span>
                        </Link>                                            
                    </nav>

                    <div className="sign-in-menu">
                    {this.props.currentUser ?                         
                        <div className="user-menu-box">
                            <span>
                                {userName}
                                {this.props.currentUser.userRole === 'student' ? 
                                <span className="credits">
                                    <DollarIcon/>                                    
                                    <span>{this.props.currentUser.credits}</span>
                                </span>                      
                                :null} 
                            </span>
                            <div className="sign-out-box" onClick={this.handleSignOut}>
                                <span id="sign-out-text">Sign Out</span>
                                <SignOutIcon/>
                            </div>
                        </div> : null
                    }                                                              
                    </div>
                </div>
            </div>            
        )
    }
}

export default Header; */