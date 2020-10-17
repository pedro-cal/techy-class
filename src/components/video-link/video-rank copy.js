import React from 'react';
import './video-rank.css';
import {firestore} from '../../firebase/firebase.utils';
import {addVideoLike, creditsOperation} from '../../firebase/databaseMethods';

import {youtubeKey} from '../../config';
import GetYoutubeId from 'get-youtube-id';
import {FaCheck as SaveIcon} from 'react-icons/fa';
import {FaCoins as DollarIcon} from 'react-icons/fa';
import {FaThumbsUp as LikeIcon} from 'react-icons/fa';
import {FaThumbsDown as DislikeIcon} from 'react-icons/fa';
import {FaTrash as TrashIcon} from 'react-icons/fa';

//* CLASS COMPONENT DECLARATION 
class VideoRank extends React.Component {

constructor(props) {
    super(props);
  
    this.state = {
      videoURL: "",
      videoID: '',
      videoURLInvalid: false,
      videoIsDuplicate: false,
      video: null,
      videoSaved: false,
      showPreview: false,
      videoList: null,
      videoPosters: []
    }    
  }

  toggleVideoListener = null;

  //* GET ALL VIDEOS POSTED ON FIREBASE 
  getVideosFromDB = () => {
    var videoList = [];
    //* Get stored videos from DB 
    firestore.collection('videos').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          //* pushing videos from DB into array variable 
          videoList.push(doc.data());          
        })
      })      
      .then(()=>{        
        this.setState({videoList: videoList},
          () => this.addUserNameToVideos());
      })
      .catch(error => console.error(error)); 
  }

  //* ADD USER NAMES TO VIDEO LIST 
  addUserNameToVideos = () => {
    let dbVideos = this.state.videoList;    
    dbVideos.forEach(video => {
      firestore.collection('users').doc(video.userID).get()
            .then(doc => {
              video.postedBy = doc.data().displayName;
            })
            .then(() => {
              this.setState({videoList: dbVideos});
            })
    });
  }  
  
  //* MONITOR FIREBASE VIDEOS COLLECTION 
  componentDidMount() {
    this.getVideosFromDB();

    //* Toggle monitor on Firestore video collection 
    this.toggleVideoListener = firestore.collection('videos')
          .onSnapshot(() => this.getVideosFromDB());
  }
  componentWillUnmount() {
    this.toggleVideoListener();
  }

  //* GET YOUTUBE ID 
  getVideo = (videoID) => {    
    if (this.state.videoURLInvalid === false) {
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${youtubeKey}`)
        .then(resp => resp.json())
        .then((resp) => {
          this.setState({video: resp.items[0], showPreview: true});
        })        
        .catch(error => console.error(error));
    }      
  } 

  //* VIDEO URL INPUT - handle change and Enter keydown 
  handleChange = (e) => {    
    this.setState({videoURL: e.target.value, videoIsDuplicate: false},
      () => {
        const videoID = GetYoutubeId(this.state.videoURL);
        console.log("videoID after input change: ", videoID);
      
        //* Validating URL and Get Video Preview 
        if (videoID !== null) {      
          this.setState({videoURLInvalid: false, videoID: videoID},
            async () => {
              console.log('videoID in state after validation: ', this.state.videoID);
              //* Checking for duplicate videos 
              await firestore.collection('videos').where('videoID', '==', this.state.videoID)
                .get()
                .then((querySnapshot) => {                  
                  querySnapshot.forEach(doc => {
                    if (doc.data().videoID === this.state.videoID) {
                      this.setState({videoIsDuplicate: true});
                    }
                  })                                      
                });
                //* Getting video preview after duplicate checking 
                if (!this.state.videoIsDuplicate) {
                  this.getVideo(videoID);
                }
            });        
        } else {
        //* Video URL is invalid 
          this.setState({videoURLInvalid: true, showPreview: false});
        }
      });
      
  }  

  //* SAVE VIDEO TO DB 
  handleSaveVideo = () => {
    const postedAt = new Date();
    firestore.collection("videos").doc(this.state.videoID).set({
      userID: this.props.currentUser.id,
      videoURL: this.state.videoURL,
      videoID: this.state.videoID,
      postedAt: postedAt,
      videoData: this.state.video
    })
    .then(() => {
      //* Take 1 credit off of the user 
      /* creditsOperation(this.props.currentUser.id, 'remove', 1); */
      creditsOperation(this.props.currentUser.id,'remove',1);

      //* Inform success, then reset state 
      this.setState({videoSaved: true});
      setTimeout(() => this.setState({videoSaved: false, showPreview: false, videoURL:'', video: null}), 5000);      
    })
    .catch(error => {
      console.error("Error adding video: ", error);
    });
  }  

  getUserByID = (userID) => {
    console.log('getUserByID activated');
    var userData;    
    firestore.collection('users').doc(userID).get()
        .then(doc => {
            if (doc.exists) {                
                userData = doc.data();
              }
        })
        .then(() => {
          this.setState({videoPosters:[
            { userID: userID,
              userName: userData.displayName }
          ]}, () => console.log(this.state.videoPosters))
        })
}

  handleClickLike = (videoID,opinion) => {
    
  }

  handleClickDelete = (videoID) => {
    firestore.collection('videos').doc(videoID).delete()
      .catch(error => console.error(error));
  }

  render() {   
    var {videoList} = this.state;    
    const currentUser = this.props.currentUser;
    
    return(
      <div className="video-box">
        <h1>Video Ranks</h1>

        {/* //* VIDEO URL INPUT FIELD */}
        <div className="input-box">                                
          <input type="search" 
          name="videoURL" 
          value={this.state.videoURL}
          onChange={this.handleChange}
          onKeyDown={this.handlePressEnter}
          className="animated-input"
          placeholder="bla"/>
          <label className="animated-label" htmlFor="videoURL">Enter Youtube URL</label>
          {/* <button className="search-button" onClick={this.handleSearchClick}><SearchIcon/></button> */}
        </div>      

        {/*//* VIDEO POSTING BOX */}

        {/* //* Video Save Confirmation*/}
        {this.state.videoURL && this.state.showPreview ?        
          <div className="video-preview">     
            <img src={this.state.video.snippet.thumbnails.medium.url}
              alt=""
              className="video-thumb"
            />
            <span className="preview-title">Post this video?</span>            
            <h4 className="video-title">{this.state.video.snippet.title}</h4>
            <span onClick={this.handleSaveVideo} className="save-icon">
              {!this.state.videoSaved ? <SaveIcon /> : null}
            </span>
            <span className="credits">
                <DollarIcon/>                                    
                <span>-1</span>
            </span>
          </div>        
        : null}
        
        {/* //* VALIDATION METHODS */}
        {this.state.videoURLInvalid ?
        <div className="error-message">Please paste a valid Youtube Link</div> : null}

        {this.state.videoIsDuplicate ?
        <div className="error-message">Video already posted. Choose another one.</div> : null}

        {this.state.videoSaved ?
        <div className="success-message">Video Posted</div> : null}
        
        {/* //* LIST DB VIDEOS */}
        {this.state.videoList !== null ? 
          <div className="video-card-box">
            {videoList.map((video) => {
              const thisVideoID = video.videoID;

              return (
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
                      <LikeIcon className="like-icon" onClick={() => addVideoLike(video.videoID,currentUser.id,'like')}/>
                    </span>
                    <span className="video-stats">
                      325
                    </span>
                    <span className="video-icon">
                      <DislikeIcon className="dislike-icon" onClick={() => addVideoLike(video.videoID,currentUser.id,'dislike')}/>
                    </span>
                    <span className="video-stats">
                      23
                    </span>
                    <span className="video-label">                      
                      {video.postedBy}               
                    </span>
                    <span className="video-icon">
                      {currentUser !== null && video.userID === currentUser.id ? 
                      <TrashIcon onClick={() => this.handleClickDelete(video.videoID)}/> : null }
                    </span>
                  </div>                  
                </div>
              </div>
            )})}
          </div> : null}
      </div>
    )
  }
}

export default VideoRank;