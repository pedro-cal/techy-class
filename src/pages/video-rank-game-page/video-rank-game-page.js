import React from 'react';
import './video-rank-game-page.css';

/* import {FaPlay as PlayIcon} from 'react-icons/fa';
import {FaPlusCircle as AddIcon} from 'react-icons/fa'; */

import VideoRank from '../../components/video-rank-game/new-video-rank-game/video-rank/video-rank';
// import { NewVideoRankGame } from '../../components/video-rank-game/new-video-rank-game/new-video-rank-game';
// import { GameList } from '../../components/ui-components/game-list/game-list';

export const VideoRankGamePage = (props) => {
  return (
    <div className="game-container">

      {/* <div className="game-list-header">
        <AddIcon />
      </div>

      <div className="game-list-main">
        <GameList gameType={'video-rank'} />  
      </div>    */}   
      
      {/* <NewVideoRankGame 
        currentUser={props.currentUser}
        userRole={props.userRole}/> */}

      <VideoRank currentUser={props.currentUser}/>
    </div>    
    );
}



