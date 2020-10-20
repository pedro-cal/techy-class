import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './header.css';

//* IMPORTING ICONS 
/* import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaUserAlt as StudentsIcon} from 'react-icons/fa'; */
import {FaSignOutAlt as SignOutIcon} from 'react-icons/fa' ;
import {FaHome as HomeIcon} from 'react-icons/fa' ;
import {FaCoins as DollarIcon} from 'react-icons/fa';
/* import {FaInfinity as InfiniteIcon} from 'react-icons/fa'; */
import { auth } from '../../firebase/firebase.utils';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.currentUser
        }
    }

    handleSignOut = () => {
        auth.signOut();
        this.setState({currentUser: null})
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
                        {/* <Link className="menu-box" to="/classes">
                            <div className="icon-box"><ClassesIcon /></div>
                            <span className="menu-item">Classes</span>
                        </Link>                    
                        <Link className="menu-box" to="/students">
                            <div className="icon-box"><StudentsIcon /></div>
                            <span className="menu-item">Students</span>
                        </Link> */}
                        {/*  <Link className="menu-box" to="/projects">
                            <div className="icon-box"><ProjectsIcon /></div>
                            <span className="menu-item">Projects</span>
                        </Link> */}
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