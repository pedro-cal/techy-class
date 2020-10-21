import React from 'react';
import './dashboard.css';

import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaUsers as StudentsIcon} from 'react-icons/fa';
import {FaClipboardCheck as ProjectsIcon} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

export const Dashboard = (props) => {
    let history = useHistory();
    return (
        <div className="dashboard-box">
            <div className="btn-group">
                <div className="dash-btn-box">
                    <div className="dash-btn-icon"><ClassesIcon/></div>
                    <div className="dash-btn-label">Classes</div>
                </div>                
                <div className="dash-btn-box" onClick={() => history.push('/students')}>
                    <div className="dash-btn-icon"><StudentsIcon/></div>
                    <div className="dash-btn-label">Students</div>
                </div>                
                <div className="dash-btn-box">
                    <div className="dash-btn-icon"><ProjectsIcon/></div>
                    <div className="dash-btn-label">Projects</div>
                </div>
            </div>           
        </div>
    )
}