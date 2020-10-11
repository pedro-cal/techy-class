import {firestore} from './firebase.utils';

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