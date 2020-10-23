import React from 'react';
import { Dashboard } from '../../components/dashboard/dashboard';
/* import VideoRank from '../../components/video-link/video-rank'; */
import './home.css';


export const Home = (props) => {   
    return (
        <div className="page-container">
            <Dashboard 
                currentUser={props.currentUser}
                students={props.students}/>
            {/* <VideoRank currentUser={this.props.currentUser}/> */}

        </div>
    ) 
}