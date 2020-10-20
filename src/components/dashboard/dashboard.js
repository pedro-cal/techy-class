import React from 'react';
import './dashboard.css';

import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaUsers as StudentsIcon} from 'react-icons/fa';
import {FaClipboardCheck as ProjectsIcon} from 'react-icons/fa';

export const Dashboard = (props) => {


    return (
        <div className="dashboard-box">
            <div className="btn-group">
                <div className="dash-btn-box">
                    <div className="dash-btn-icon"><ClassesIcon/></div>
                    <div className="dash-btn-label">Classes</div>
                </div>
                <a href="/students">
                    <div className="dash-btn-box">
                        <div className="dash-btn-icon"><StudentsIcon/></div>
                        <div className="dash-btn-label">Students</div>
                    </div>
                </a>
                <div className="dash-btn-box">
                    <div className="dash-btn-icon"><ProjectsIcon/></div>
                    <div className="dash-btn-label">Projects</div>
                </div>
            </div>
            

            {/* <div className="date-sandbox">
                <div className="input-container">
                    <label htmlFor="start-date" className="normal-label">Start Date</label>
                    <input type="date" name="start-date" className="input-date"/>    
                </div>
                <div className="input-container">
                    <label htmlFor="end-date" className="normal-label">End Date</label>
                    <input type="date" name="end-date" className="input-date"/>    
                </div>                
            </div> */}
        </div>
    );
}