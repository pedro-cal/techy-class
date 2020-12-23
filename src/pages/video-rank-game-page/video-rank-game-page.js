import React from 'react';
import './video-rank-game-page.css';

import VideoRank from '../../components/video-rank/video-rank';

export const VideoRankGamePage = (props) => {
  return (
    <div className="game-container">
      {/* {props.userRole === 'student' ? 
        <div>Hello Student</div>  : 
        <div className="video-rank-create">
          <div className="form-title">New Video Rank Game</div>

          <div className="text-input-box">                                
            <input 
                type='text'
                name='game-title'                
                className="text-input"
                placeholder="bla"
            />
            <label className="text-input-label" htmlFor="game-title">Game Title</label>
          </div>

          <div className="text-input-box">                                
            <input 
                type="text"
                name="game-goal"                
                className="text-input"
                placeholder="bla"
            />
            <label className="text-input-label" htmlFor="game-goal">Game Objective</label>
          </div>

          <div className="text-input-box">                                
            <input 
                type="text"
                name="game-time"                
                className="text-input"
                placeholder="bla"
            />
            <label className="text-input-label" htmlFor="game-goal">{`Game Time (minutes)`}</label>
          </div>
          
          <button className="form-btn">Create Game</button>

        </div>        
      } */}
      <VideoRank currentUser={props.currentUser}/>
    </div>    
    );
}



