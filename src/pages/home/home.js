import React from 'react';
import VideoRank from '../../components/video-link/video-rank';
import './home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.currentUser
        }
    }

    render() {
        return(
            <div className="page-container">
                <VideoRank currentUser={this.props.currentUser}/>
            </div>
        )
    }
}

export default Home;