import React from 'react';
import './games.css';

import {FaYoutube as YoutubeIcon} from 'react-icons/fa';
import {FaGraduationCap as ClassesIcon} from 'react-icons/fa';
import {FaTasks as TasksIcon} from 'react-icons/fa';

import { useHistory } from 'react-router-dom';

export const Games = () => {    
    
    let history = useHistory();

    return (
        <div className="games-box">
              
            <div className="game-info-box" onClick={() => history.push('/game-videorank')}>
                <div className="dash-icon"><YoutubeIcon/></div>
                <div className="game-title">Video Ranks</div>
                <div className="game-description">
                    <p>Choose a topic, post a video, vote on videos. Who gets more votes?</p>
                </div>
            </div>

            <div className="game-info-box">
                <div className="dash-icon"><ClassesIcon/></div>
                <div className="game-title">Survey</div>
                <div className="game-description">Classes</div>                                
            </div>

            <div className="game-info-box">
                <div className="dash-icon"><TasksIcon/></div>
                <div className="game-title">Guess</div>
                <div className="game-description">Pending Tasks</div>                                
            </div>
        </div>
    )
}