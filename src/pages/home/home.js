import React from 'react';
import { Dashboard } from '../../components/dashboard/dashboard';
/* import VideoRank from '../../components/video-link/video-rank'; */
import './home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);      
    }

    render() {
        return(
            <div className="page-container">
                <Dashboard 
                    currentUser={this.props.currentUser}
                    students={this.props.students}/>
                {/* <VideoRank currentUser={this.props.currentUser}/> */}

            </div>
        )
    }
}

export default Home;