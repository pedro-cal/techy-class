import {firestore} from './firebase.utils';
import * as firebase from 'firebase';

//* A function to perform credits operations 
export const creditsOperation = (userID, operation, number) => {
    const userRef = firestore.collection('users').doc(userID);
    var currentCredits, calc;
    userRef.get().then((doc) => {
        if (doc.exists) {
            currentCredits = doc.data().credits;
            console.log('currentCredits = ', currentCredits);
        }})
        .then(() => {
            switch (operation) {
                case 'add':
                    calc = currentCredits + number;
                    userRef.update({credits: calc});
                    break;
                
                case 'remove':
                    calc = currentCredits - number;
                    console.log('calc after remove operation = ',calc);
                    userRef.update({credits: calc});
                    break;
                default: calc = 0;
            }
        })
}

//* A function to get a user's data based on their userID 
export const getUserByID = (userID) => {
    console.log('getUserByID activated');
    let userData;
    firestore.collection('users').doc(userID).get()
        .then(doc => {
            if (doc.exists) {                
                userData = doc.data();
                console.log('User data retrieved from Db = ',userData);
            }
        })
    return userData.displayName;
}

//* A function to manage liking and disliking shared videos 
export const addVideoLike = (videoID, userID, buttonType, toggled) => {
    const videoRef = firestore.collection('videos').doc(videoID);
    
    const switchToLike = () => {
        videoRef.update({
            likes: firebase.firestore.FieldValue.arrayRemove(
                {likedBy: userID, opinion: 'dislike'}                
            )
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    {likedBy: userID, opinion: ''}                
                )
            })
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    {likedBy: userID, opinion: 'like'}
                )
            })
        })
        .catch(error => console.error("error liking video: ", error));
    }

    const switchToUnlike = () => {
        videoRef.update({
            likes: firebase.firestore.FieldValue.arrayRemove(
                {likedBy: userID, opinion: 'dislike'}                
            )
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    {likedBy: userID, opinion: 'like'}                
                )
            })
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    {likedBy: userID, opinion: ''}
                )
            })
        })
        .catch(error => console.error("error unliking video: ", error));
    }

    const switchToDislike = () => {
        videoRef.update({
            likes: firebase.firestore.FieldValue.arrayRemove(
                {likedBy: userID, opinion: 'like'}                
            )
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    {likedBy: userID, opinion: ''}                
                )
            })
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    {likedBy: userID, opinion: 'dislike'}
                )
            })
        })
        .catch(error => console.error("error disliking video: ", error));
    }

    const switchToUndislike = () => {
        videoRef.update({
            likes: firebase.firestore.FieldValue.arrayRemove(
                {likedBy: userID, opinion: 'like'}                
            )
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    {likedBy: userID, opinion: 'dislike'}                
                )
            })
        })
        .then(() => {
            videoRef.update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    {likedBy: userID, opinion: ''}
                )
            })
        })
        .catch(error => console.error("error undisliking video: ", error));
    }

    if (buttonType === 'like' && toggled === false) {
        switchToLike();
    } else if (buttonType === 'like' && toggled === true) {
        switchToUnlike();
    } else if (buttonType === 'dislike' && toggled === false) {
        switchToDislike();
    } else if (buttonType === 'dislike' && toggled === true) {
        switchToUndislike();
    }
    
}