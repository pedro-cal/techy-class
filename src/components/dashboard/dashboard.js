import React from 'react';
import './dashboard.css';

//* Dashboard subcomponents 
import {Games} from '../games/games';
import {Timer} from '../class-tools/timer/timer';

//* Importing Icons 
import {FaGamepad as GamesIcon} from 'react-icons/fa';
import {FiRadio as LiveIcon} from 'react-icons/fi';
import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaUsers as StudentsIcon} from 'react-icons/fa';
import {FaTasks as TasksIcon} from 'react-icons/fa';
import {FaClipboardCheck as ProjectsIcon} from 'react-icons/fa';

import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Dashboard = (props) => {
    const [classes, setClasses] = useState([]);   
    const [toggleGames, setToggleGames] = useState(false);
    const [toggleTeacherInfo, setToggleTeacherInfo] = useState(true);

    useEffect(() => {
        if (props.currentUser) {
            setClasses(props.currentUser.teachesClasses);            
        }        
    },[props.currentUser]);

    let history = useHistory();
    
    return (
        <div className="dashboard-box">
            <div className="btn-group">
                <div className="dash-btn-box">
                    <div className="dash-icon"><LiveIcon/></div>
                    <div className="dash-btn-label">Live</div>
                </div>                
                <div 
                    className={toggleGames ? "dash-btn-box toggle-clicked" : "dash-btn-box"} 
                    onClick={() => {
                        setToggleGames(!toggleGames); 
                        setToggleTeacherInfo(!toggleTeacherInfo);}}>
                    <div className="dash-icon"><GamesIcon/></div>
                    <div className="dash-btn-label">Games</div>
                </div>                
                <div className="dash-btn-box">
                    <div className="dash-icon"><ProjectsIcon/></div>
                    <div className="dash-btn-label">Projects</div>
                </div>                
            </div>
            
            {toggleGames ? <Games /> : null}
            
            {props.currentUser.userRole.includes('teacher') && toggleTeacherInfo ? 
            <div className="info-boxes-container">
                <div className="dash-info-box" onClick={() => history.push('/students')}>
                    <div className="dash-icon"><StudentsIcon/></div>
                    <div className="dash-big-number">{props.students.length}</div>
                    <div className="dash-info-label">Students</div>
                </div>
                <div className="dash-info-box" onClick={() => history.push('/classes')}>
                    <div className="dash-icon"><ClassesIcon/></div>
                    <div className="dash-big-number">{classes.length}</div>
                    <div className="dash-info-label">Classes</div>                                
                </div>
                <div className="dash-info-box">
                    <div className="dash-icon"><TasksIcon/></div>
                    <div className="dash-big-number pending">8</div>
                    <div className="dash-info-label">Pending Tasks</div>                                
                </div>
            </div> : null}

            <Timer />
                    
        </div>
    )
}