import React,{useState} from 'react';
import './timer.css';

import {FaPlay as PlayIcon} from 'react-icons/fa';
import {FaPause as PauseIcon} from 'react-icons/fa';
import {FaStop as StopIcon} from 'react-icons/fa';
import { useEffect } from 'react';

export const Timer = () => {

  const [min, setMin] = useState(0);  
  const [sec, setSec] = useState(0);  
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [blockInputs, setBlockInputs] = useState(false);

  let totalTime = (parseInt(min,10)*60) + parseInt(sec,10);

  useEffect(() => {
    if(timerStarted) {
      if (totalTime <= 0) {
        setTimerStarted(false)
        setBlockInputs(false)
        setMin(0)
        setSec(0)
        return}
  
      const countdownInterval = setInterval(() => {
        totalTime --
        
        setSec(totalTime%60)

        setMin(Math.floor(totalTime/60))                               
        
      }, 1000);
  
      return () => clearInterval(countdownInterval);
    }   

  }, [timerStarted, totalTime]);  

  return(
      <div className="timer-box">
        <div className={blockInputs ? "timer-inputs block-inputs" : "timer-inputs"}>
          <input 
            type="text" 
            name="timer-digit" 
            id="minutes"
            maxLength="2"
            onFocus={() => setMin('')}
            value={min}
            onChange={(e) => {
              setMin(Math.floor(e.target.value));
            }}/>
          <div>:</div>
          <input 
            type="text" 
            name="timer-digit" 
            id="seconds" 
            maxLength="2"
            onFocus={() => setSec('')}
            value={sec}
            onChange={(e) => {              
                setSec(e.target.value)              
              /* setSec(Math.floor(e.target.value)); */
            }}/>
        </div>
        
        <div className="timer-button-group">
          <span className={ timerStarted ? "timer-button toggled" : "timer-button" }
            onClick={() => {
              setTimerStarted(true); 
              setTimerPaused(false);
              setBlockInputs(true);}}> <PlayIcon /> </span>
          <span className={ timerPaused ? "timer-button toggled" : "timer-button" }
            onClick={() => {setTimerPaused(true); setTimerStarted(false)}}> <PauseIcon /> </span>
          <span className="timer-button"
            onClick={() => {
              setTimerPaused(false); 
              setTimerStarted(false);
              setBlockInputs(false);
              setMin(0);
              setSec(0);
            }}> <StopIcon /> </span>
        </div>
      </div>
  )
}


