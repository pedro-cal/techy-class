import React,{useState} from 'react';
import './new-video-rank-game.css';

import {firestore} from '../../../firebase/firebase.utils';

export const NewVideoRankGame = ({currentUser, userRole}) => {
    const imgPlaceholder = 'https://gulyasimre.hu/wp-content/uploads/2013/10/placeholder_image1.png';

    const [gameTitle, setGameTitle] = useState('');
    const [gameImg, setGameImg] = useState('');
    const [gameGoal, setGameGoal] = useState('');
    const [gameTime, setGameTime] = useState(5);
    const [gameCreated, setGameCreated] = useState(false);

    const handleTitleInput = (e) => {
        setGameTitle(e.target.value);        
    }
    const handleImgInput = (e) => {
        setGameImg(e.target.value);        
    }
    const handleGoalInput = (e) => {
        setGameGoal(e.target.value);        
    }
    const handleTimeInput = (e) => {
        setGameTime(e.target.value);        
    }

    const handleCreateNewGame = () => {
        const createdAt = new Date();
        const newGame = {            
            gameType: 'video-rank',
            createdAt: createdAt,
            endedAt: '',
            gameImg: gameImg,
            gameTitle: gameTitle,            
            gameGoal: gameGoal,
            gameTime: gameTime,
            isJoinable: true,
            gameOn: false,
            players: [],
            createdBy: currentUser
        }

        firestore.collection("games").add(newGame)
            .then(() => {
                setGameCreated(true);
                setTimeout(() => {
                    setGameCreated(false)                
                    setGameTitle('');        
                    setGameImg('');
                    setGameGoal('');        
                    setGameTime('');                
                }, 5000)
            })
            .catch(error => {console.error("Error creating game: ", error)})
    }

  return (
        <div className="new-game-form">
            <div className="form-title">New Video Rank Game</div>

            <img 
                className="game-cover-img"src={gameImg === '' ? imgPlaceholder : gameImg} 
                alt="New Video Rank Game Cover"/>

            <div className="text-input-box">                                
                <input 
                    type='text'
                    name='game-title'                
                    className="text-input"
                    placeholder="bla"
                    value={gameTitle}
                    onChange={handleTitleInput}
                />
                <label className="text-input-label" htmlFor="game-title">Game Title</label>
            </div>

            <div className="text-input-box">                                
                <input 
                    type='text'
                    name='cover-image'                
                    className="text-input"
                    id='imgURLInput'
                    placeholder="bla"
                    value={gameImg}
                    onChange={handleImgInput}
                />
                <label className="text-input-label" htmlFor="cover-image">Cover Image URL</label>
            </div>

            <div className="text-input-box">                                
                <input 
                    type="text"
                    name="game-goal"                
                    className="text-input"
                    placeholder="bla"
                    value={gameGoal}
                    onChange={handleGoalInput}
                />
                <label className="text-input-label" htmlFor="game-goal">Game Goal</label>
            </div>

            <div className="text-input-box">                                
                <input 
                    type="text"
                    name="game-time"                
                    className="text-input"
                    placeholder="bla"
                    value={gameTime}
                    onChange={handleTimeInput}
                />
                <label className="text-input-label" htmlFor="game-goal">{`Game Time (minutes)`}</label>
            </div>
            
            <button className="form-btn" onClick={handleCreateNewGame}>Create Game</button>            

            {gameCreated ?
            <div className="success-message">Game Created Successfully</div> : null}

        </div>            
    );
}