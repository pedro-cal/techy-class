import React from 'react';
import './ui-text-input.css';

export const UITextInput = ({type, name, value, onChange, label}) => {


    return (
        <div className="ui-text-input-box">
            <div className="text-input-box">                                
                <input 
                    type='text'
                    name='game-title'                
                    className="text-input"
                    placeholder="bla"
                />
                <label className="text-input-label" htmlFor="game-title">Game Title</label>
            </div>
        </div>
    );
}