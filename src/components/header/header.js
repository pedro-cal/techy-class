import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

//IMPORTING ICONS
import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaUserAlt as StudentsIcon} from 'react-icons/fa';
import {FaUsers as GroupsIcon} from 'react-icons/fa';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
        }
    }

    render() {
        return(
            <div className="header">
                <div className="main-menu">
                    <Link className="menu-box" to="/">
                        <div className="icon-box"><ClassesIcon /></div>
                        <span className="menu-item">Classes</span>
                    </Link>                    
                    <Link className="menu-box" to="/students">
                        <div className="icon-box"><StudentsIcon /></div>
                        <span className="menu-item">Students</span>
                    </Link>
                    <Link className="menu-box" to="/groups">
                        <div className="icon-box"><GroupsIcon /></div>
                        <span className="menu-item">Groups</span>
                    </Link>                
                    <div className="sign-in-menu">
                    {this.state.currentUser?
                        'Hello, Teacher':
                        <Link className="sign-in-link" to="/sign-in">Sign in</Link>     
                    }
                    </div>
                </div>                
            </div> 
        )
    }
}

export default Header;