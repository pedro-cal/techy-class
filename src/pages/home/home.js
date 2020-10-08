import React from 'react';
import VideoLink from '../../components/video-link/video-link';
import './home.css';

/* const Home = () => (
    <div className="page-container">
        Home Page
    </div>
) */

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
                <VideoLink currentUser={this.props.currentUser}/>
            </div>
        )
    }
}

export default Home;