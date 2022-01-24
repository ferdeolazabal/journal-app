import { firebase, googleAuthProvider } from '../../firebase/firebaseConfig';
import { types } from "../types/types"

export const startLoginEmailPassword = (email, password) => {
    
    return (dispatch) => {

        setTimeout(() => {
            
            dispatch (login(12345, 'Fernando'));
        }, 3000);
    
    }
}

export const startLoginGoogle = () => {

    return ( dispatch ) => {

    firebase.auth().signInWithPopup(googleAuthProvider)
        .then( ({ user }) => {
            dispatch( 
                login(user.uid, user.displayName) 
            );
        })

    }
}



export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
    }
})