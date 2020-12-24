import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../../firebase/firebase.utils';
import './game-list.css';

import {FaPlay as PlayIcon} from 'react-icons/fa';

export const GameList = ({gameType}) => {    
    
    let history = useHistory();
    
    const [games, setGames] = useState([]);

    useEffect(() => {
        let gamesFromDB = [];
        firestore.collection('games').where("gameType", "==", gameType)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    gamesFromDB.push(doc.data())
                })
            })
            .then(() => {
                setGames(gamesFromDB);
            })
            .catch(error => console.error("Error getting Video-rank games from DB: ", error));
    },[games, gameType])

    return (
        <div className="game-list-box">

            {games.map((game) => {
                return(
                    <div className="game-card-box">
                        <div className="game-thumb-box">
                            <img className="game-cover-thumb" src={game.gameImg} alt="Game Cover"/>
                        </div>
                        <div className="game-card-title">{game.gameTitle}</div>
                        <div className="game-description">
                            <p>{game.gameGoal}</p>
                        </div>
                    </div>
                )
            })}  
            
            {/* <div className="game-info-box" onClick={() => history.push('/game-videorank')}> */}
            
        </div>
    )
}