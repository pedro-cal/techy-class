import {firestore} from './firebase.utils';

export const creditsOperation = (userID, operation, number) => {
    const userRef = firestore.collection('users').doc(userID);
    var currentCredits, calc;
    userRef.get().then((doc) => {
        if (doc.exists) {
            currentCredits = doc.data().credits;
            console.log('currentCredits = ', currentCredits);
        }});

    switch (operation) {
        case 'add':
            calc = currentCredits + number;
            userRef.update({credits: calc});
            break;
        
        case 'remove':
            calc = currentCredits - number;
            userRef.update({credits: calc});
            break;        
    }   
}

export const getUserByID = (userID) => {
    console.log('getUserByID activated');
    firestore.collection('users').doc(userID).get()
        .then(doc => {
            if (doc.exists) {
                return doc.data();
            }
        })
}