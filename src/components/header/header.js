import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

//* IMPORTING ICONS 
import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaUserAlt as StudentsIcon} from 'react-icons/fa';
import {FaSignOutAlt as SignOutIcon} from 'react-icons/fa' ;
import { auth } from '../../firebase/firebase.utils';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }   

    render() {
        var user = this.props.currentUser;        
        var userName;      
        if(user !== null) {
            userName = user.displayName;
             
        }
        
        return(
            <div className="header">                
                <div className="main-menu">
                    <div className="menu-logo">Techy Class</div>
                    <div className="menu-container">
                        <Link className="menu-box" to="/classes">
                            <div className="icon-box"><ClassesIcon /></div>
                            <span className="menu-item">Classes</span>
                        </Link>                    
                        <Link className="menu-box" to="/students">
                            <div className="icon-box"><StudentsIcon /></div>
                            <span className="menu-item">Students</span>
                        </Link>
                       {/*  <Link className="menu-box" to="/projects">
                            <div className="icon-box"><ProjectsIcon /></div>
                            <span className="menu-item">Projects</span>
                        </Link> */}
                    </div>                                    
                    <div className="sign-in-menu">
                    {this.props.currentUser ?                         
                        <div className="user-menu-box">
                            <span>{`Hello, ${userName}`}</span>
                            <div className="sign-out-box" onClick={() => auth.signOut()}>
                                <span id="sign-out-text">Sign Out</span>
                                <SignOutIcon/>
                            </div>
                        </div> : null
                    }
                        {/* <div className="sign-in-box">
                            <Link className="sign-in-link" to="/sign-in">Sign in</Link>
                        </div>                         */}                    
                    </div>
                </div>                
            </div> 
        )
    }
}

export default Header;