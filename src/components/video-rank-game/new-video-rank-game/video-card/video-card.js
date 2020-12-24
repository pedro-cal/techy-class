import React from 'react';
import './video-card.css';

import {addVideoLike} from '../../firebase/databaseMethods';
import {firestore} from '../../firebase/firebase.utils';

import {FaThumbsUp as LikeIcon} from 'react-icons/fa';
import {FaThumbsDown as DislikeIcon} from 'react-icons/fa';
import {FaTrash as TrashIcon} from 'react-icons/fa';

class VideoCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            likeToggle: false,
            dislikeToggle: false,
            videoLikes: [],
            totalLikes: 0,
            totalDislikes: 0,
            currentUserLike: [],
            userCanDelete: false
        }        
    }

    toggleVideoLikesListener = null;

    handleUserCanDelete = () => {
        let video = this.props.video;
        let currentUser = this.props.currentUser;
        
        if (currentUser !== null) { 
            if (video.userID === currentUser.id ||
                currentUser.userRole.includes('manager')) {
            this.setState({userCanDelete: true});
            }
        } 
    }

    componentDidMount() {
        this.getVideoLikes(); 
        this.handleUserCanDelete();       

        this.toggleVideoLikesListener = firestore.collection('videos').doc(this.props.video.videoID)
            .onSnapshot(() => {
                this.getVideoLikes();                
            });
    }

    componentWillUnmount() {
        this.toggleVideoLikesListener();
    }

    getVideoLikes = () => {
        const videoRef = firestore.collection('videos').doc(this.props.video.videoID);        

        videoRef.get()
            .then(doc => {
                if(doc.exists){
                    this.setState({videoLikes: doc.data().likes},
                    () => {
                        this.getLikeStats();
                    });
                }
            })
    }

    getLikeStats = () => {        
        const {videoLikes} = this.state;
        const currentUser = this.props.currentUser;
        
        if (videoLikes !== undefined) {
            let totalLikes = videoLikes.filter(like => like.opinion === 'like').length;
            let totalDislikes = videoLikes.filter(like => like.opinion === 'dislike').length;
            let currentUserLike = videoLikes.filter(like => like.likedBy === currentUser.id);

            this.setState({
                totalLikes: totalLikes, 
                totalDislikes: totalDislikes, 
                currentUserLike: currentUserLike[0]
            },
            () => {
                this.paintLikeButtons();                
            });
        }        
    }

    paintLikeButtons = () => {
        const {currentUserLike} = this.state;

        if (currentUserLike !== undefined && currentUserLike.opinion === 'like') {
            this.setState({likeToggle: true, dislikeToggle: false})
        } else if (currentUserLike !== undefined && currentUserLike.opinion === 'dislike') {
            this.setState({likeToggle: false, dislikeToggle: true})
        }
    }    

    handleClickDelete = (videoID) => {
        firestore.collection('videos').doc(videoID).delete()
          .catch(error => console.error(error));
    }

    handleClickLike = (videoID, userID) => {
        const likeToggle = this.state.likeToggle;

        this.setState({likeToggle: !likeToggle, dislikeToggle: false}, () => {            
            addVideoLike(videoID, userID, 'like', likeToggle);
        });
    }

    handleClickDislike = (videoID, userID) => {
        const dislikeToggle = this.state.dislikeToggle;
        this.setState({dislikeToggle: !dislikeToggle, likeToggle: false}, () => {            
            addVideoLike(videoID, userID, 'dislike', dislikeToggle);
        });
    }

    render() {
        const video = this.props.video;
        const videoID = video.videoID;
        const currentUser = this.props.currentUser;
        const {likeToggle,dislikeToggle,totalLikes,totalDislikes} = this.state;        

        return (
            <div className="video-card" key={videoID}>                
                <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                    <img src={video.videoData.snippet.thumbnails.medium.url} 
                    alt=""
                    className="video-thumb"
                    />                  
                </a> 

                <div className="video-text">
                    <span className="video-title">{video.videoData.snippet.title}</span>
                                    
                    <div className="video-buttons">
                    <span 
                        className={likeToggle ? "video-icon like-icon toggled" : "video-icon like-icon"}
                        onClick={() => this.handleClickLike(videoID, currentUser.id)} >
                        <LikeIcon />
                    </span>
                    <span className="video-stats">                    
                        {totalLikes ? totalLikes : 0}
                    </span>
                    <span 
                        className={dislikeToggle ? "video-icon like-icon toggled" : "video-icon like-icon"}
                        onClick={() => this.handleClickDislike(videoID, currentUser.id)} >
                        <DislikeIcon />
                    </span>
                    <span className="video-stats">
                        {totalDislikes ? totalDislikes : 0}
                    </span>
                    <span className="video-label">                      
                        {video.postedBy}               
                    </span>
                    <span className="video-icon">
                        {this.state.userCanDelete ?                         
                        <TrashIcon onClick={() => this.handleClickDelete(videoID)}/> : null }                        
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoCard;