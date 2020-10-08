import React from 'react';
import './video-link.css';
import {firestore} from '../../firebase/firebase.utils';

import GetYoutubeId from 'get-youtube-id';
import {FaCheck as SaveIcon} from 'react-icons/fa';
import {FaSearch as SearchIcon} from 'react-icons/fa';
import {FaThumbsUp as LikeIcon} from 'react-icons/fa';
import {FaThumbsDown as DislikeIcon} from 'react-icons/fa';
import {FaTrash as TrashIcon} from 'react-icons/fa';

class VideoLink extends React.Component {

constructor(props) {
    super(props);
  
    this.state = {
      videoURL: "",
      video: null,
      videoSaved: false,
      showPreview: false,
      videoList: null
    }    
  }

  toggleVideoListener = null;

  getVideosFromDB = () => {
    var videoList = [];
    firestore.collection('videos').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          videoList.push(doc.data());
        })
      })
      .then(()=>{
        this.setState({videoList: videoList},
          ()=>console.log(this.state.videoList));
      })
      .catch(error => console.error(error)); 
  }
  
  componentDidMount() {
    this.getVideosFromDB();
    this.toggleVideoListener = firestore.collection('videos')
          .onSnapshot(() => this.getVideosFromDB());
  }

  componentWillUnmount() {
    this.toggleVideoListener();
  }

  getVideo = () => {
    const key = 'AIzaSyCKKT39Cj300mdznNcTRtDnNwPW3fimUR8';    
    /* const URL = 'https://youtu.be/9sWEecNUW-o';
    const idPosition = URL.indexOf('.be/') + 4;
    const videoID = URL.slice(idPosition); */
    const videoID = GetYoutubeId(this.state.videoURL);    

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${key}`)
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({video: resp.items[0], showPreview: true});        
      })
      .catch(error => console.error(error));   
  } 

  handleChange = (e) => {
    this.setState({videoURL: e.target.value})
  }

  handleSearchClick = () => {
    this.getVideo();    
  }

  handleSaveVideo = () => {
    const postedAt = new Date();
    firestore.collection("videos").add({
      userID: this.props.currentUser.id,
      videoURL: this.state.videoURL,
      postedAt: postedAt,
      videoData: this.state.video
    })
    .then(docRef => {
      this.setState({videoSaved: true});
      setTimeout(() => this.setState({videoSaved: false, showPreview: false, videoURL:'', video: null}), 5000)
      console.log("Document added with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding video: ", error);
    });
  }

  handlePressEnter = (e) => {
    if (e.key === "Enter" && e.target.value !== ""){
      this.getVideo();      
    }
  
 /*  handleClickLike = (e) => {

  } */
  
}

  render() {   
    var {videoList} = this.state;
    const currentUser = this.props.currentUser;
    
    return(
      <div className="video-box">
        <div className="field-wrapper">                                
          <input type="search" 
          name="videoURL" 
          value={this.state.videoURL}
          onChange={this.handleChange}
          onKeyDown={this.handlePressEnter}
          className="animated-input"
          placeholder="bla"/>
          <label className="animated-label" htmlFor="videoURL">Enter Youtube URL</label>
          <button className="search-button" onClick={this.handleSearchClick}><SearchIcon/></button>
        </div>        
        {this.state.video !== null && this.state.showPreview ?
        <div className="video-preview">          
          <img src={this.state.video.snippet.thumbnails.medium.url}
            alt=""
            className="video-thumb"
          />
          <h4 className="video-title">{this.state.video.snippet.title}</h4>
          <span onClick={this.handleSaveVideo} className="save-icon"><SaveIcon /></span>
        </div>
        : null}

        {this.state.videoSaved ?
        <div className="success-message">Video Posted</div> : null}
        
        {this.state.videoList !== null ? 
          <div className="video-card-box">
            {videoList.map(video => (
              <div className="video-card" key={video.videoURL}>                
                <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                  <img src={video.videoData.snippet.thumbnails.medium.url} 
                    alt=""
                    className="video-thumb"
                  />                  
                </a>                
                <div className="video-text">
                  <span className="video-title">{video.videoData.snippet.title}</span>                  
                  <div className="video-buttons">
                    <span className="video-icon">
                      <LikeIcon className="like-icon" onClick={this.handleClickLike}/>
                    </span>
                    <span className="video-stats">
                      325
                    </span>
                    <span className="video-icon">
                      <DislikeIcon className="dislike-icon" onClick={this.handleClickLike}/>
                    </span>
                    <span className="video-stats">
                      23
                    </span>
                    <span className="video-label">
                      {currentUser.displayName}
                    </span>
                    <span className="video-icon">
                      {video.userID === currentUser.id ? 
                      <TrashIcon onClick={this.handleClickDelete}/> : null }
                    </span>
                  </div>                  
                </div>
              </div>
            ))}
          </div> : null}
      </div>
    )
  }
}

export default VideoLink;